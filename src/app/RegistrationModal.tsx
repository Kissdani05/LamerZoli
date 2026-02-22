// races tábla integráció a nevezési modalho
'use client';
import { useEffect, useState } from 'react';
import { useI18n } from './i18n/LanguageContext';

type RegistrationSubmit = {
  name: string;
  email: string;
  phone: string;
  weight: number;
  race: string;
  race_name: string;
  category: string;
  team_size?: number;
  sws_id?: string;
};

type RegistrationForm = {
  name: string;
  email: string;
  phone: string;
  weight: string;
  race: string;
  category: string;
  team_size: string;
  sws_id?: string;
};

export default function RegistrationModal({
  open,
  onClose,
  onSubmit,
  defaultRaceId,
  customRaces,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationSubmit) => void;
  defaultRaceId?: string;
  customRaces?: { id: string; name: string; categories?: string[] }[];
}) {
  useI18n();
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    phone: '',
    weight: '',
    race: '',
    category: '',
    team_size: '',
    sws_id: '',
  });

  const [races, setRaces] = useState<{ id: string; name: string; categories?: string[] }[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Combined effect: Reset, load races, and set default race when modal opens
  useEffect(() => {
    if (!open) {
      // Reset everything when modal closes
      setForm({
        name: '',
        email: '',
        phone: '',
        weight: '',
        race: '',
        category: '',
        team_size: '',
        sws_id: '',
      });
      setAvailableCategories([]);
      setRaces([]);
      return;
    }

    // Modal is opening - load races
    const loadRaces = async () => {
      let raceOptions: { id: string; name: string; categories?: string[] }[] = [];

      if (customRaces) {
        raceOptions = [{ id: '', name: 'Válassz versenyt' }, ...customRaces];
      } else {
        try {
          const res = await fetch('/api/races');
          const json = await res.json();
          const list: { id: string; name: string; categories?: string[] }[] = Array.isArray(
            json?.races,
          )
            ? json.races
            : [];
          raceOptions = [{ id: '', name: 'Válassz versenyt' }, ...list];
        } catch {
          raceOptions = [{ id: '', name: 'Válassz versenyt' }];
        }
      }

      setRaces(raceOptions);

      // After races are loaded, set default race if provided
      if (defaultRaceId && raceOptions.length > 0) {
        setForm((f) => ({ ...f, race: defaultRaceId, category: '', team_size: '' }));

        // Also set available categories
        const selectedRace = raceOptions.find((r) => r.id === defaultRaceId);
        if (selectedRace && selectedRace.categories && Array.isArray(selectedRace.categories)) {
          setAvailableCategories(selectedRace.categories);
        }
      }
    };

    loadRaces();
  }, [open, defaultRaceId, customRaces]);

  // Update available categories when race changes (for manual race selection)
  useEffect(() => {
    if (!form.race) {
      setAvailableCategories([]);
      return;
    }

    const selectedRace = races.find((r) => r.id === form.race);
    if (selectedRace && selectedRace.categories && Array.isArray(selectedRace.categories)) {
      setAvailableCategories(selectedRace.categories);
      // Reset category if current category is not in the new race's categories
      if (form.category && !selectedRace.categories.includes(form.category)) {
        setForm((f) => ({ ...f, category: '', team_size: '' }));
      }
    } else {
      setAvailableCategories([]);
      setForm((f) => ({ ...f, category: '', team_size: '' }));
    }
  }, [form.race, races, form.category]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!form.name || !form.email || !form.phone || !form.weight || !form.race || !form.category) {
      setMessage('Minden mező kitöltése kötelező!');
      setLoading(false);
      return;
    }
    // Check if Endurance and team_size is missing
    if (form.category === 'Endurance' && !form.team_size) {
      setMessage('Kérlek add meg a csapat létszámát!');
      setLoading(false);
      return;
    }
    const selectedRace = races.find((r) => r.id === form.race)?.name || '';
    if (!selectedRace) {
      setMessage('Nem sikerült lekérni a versenyeket');
      setLoading(false);
      return;
    }
    await onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      weight: Number(form.weight),
      race: form.race,
      race_name: selectedRace,
      category: form.category,
      team_size:
        form.category === 'Endurance' && form.team_size ? Number(form.team_size) : undefined,
      sws_id: form.sws_id?.trim() ? form.sws_id.trim() : undefined,
    });
    setLoading(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      weight: '',
      race: '',
      category: '',
      team_size: '',
      sws_id: '',
    });
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-black text-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 w-full max-w-md z-10 transition-transform transform-gpu duration-300 ease-in-out border-[3px] border-white my-2 sm:my-4 md:my-8 overflow-y-auto"
        style={{
          maxHeight: 'calc(100vh - 2rem)',
        }}
      >
        <button
          className="absolute top-3 right-3 md:top-4 md:right-4 text-xl sm:text-2xl text-white hover:text-[#e4eb34] focus:outline-none focus:ring-2 focus:ring-[#e4eb34] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-colors"
          onClick={onClose}
          aria-label="Bezárás"
        >
          ×
        </button>
        <h2 className="text-xl md:text-2xl font-extrabold mb-2 tracking-tight">Nevezés</h2>

        {/* Display selected race name - only if defaultRaceId was provided */}
        {defaultRaceId && form.race && races.find((r) => r.id === form.race) && (
          <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/20">
            <p className="text-xs md:text-sm text-white/60 mb-1">Verseny:</p>
            <p className="text-base md:text-lg font-bold text-[#e4eb34]">
              {races.find((r) => r.id === form.race)?.name}
            </p>
          </div>
        )}

        <form
          className="flex flex-col gap-4 md:gap-5 w-full"
          onSubmit={handleSubmit}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Race selection - show first if no defaultRaceId */}
          {!defaultRaceId && (
            <>
              <label className="font-semibold text-xs md:text-sm" htmlFor="race">
                Verseny
              </label>
              <select
                id="race"
                name="race"
                className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all"
                value={form.race}
                onChange={handleChange}
                required
              >
                {races.map((r) => (
                  <option key={r.id} value={r.id} className="bg-black text-white">
                    {r.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Category selection - Second field (or first if defaultRaceId exists) */}
          {availableCategories.length > 0 && (
            <>
              <label className="font-semibold text-xs md:text-sm" htmlFor="category">
                Kategória *
              </label>
              <select
                id="category"
                name="category"
                className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-black text-white">
                  Válassz kategóriát
                </option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Team size selection - Only for Endurance category */}
          {form.category === 'Endurance' && (
            <>
              <label className="font-semibold text-xs md:text-sm" htmlFor="team_size">
                Hány fős a csapat? *
              </label>
              <select
                id="team_size"
                name="team_size"
                className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all"
                value={form.team_size}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-black text-white">
                  Válassz létszámot
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num} className="bg-black text-white">
                    {num} fő
                  </option>
                ))}
              </select>
            </>
          )}

          <label className="font-semibold text-xs md:text-sm" htmlFor="name">
            Teljes név
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Teljes név"
            className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-xs md:text-sm" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-xs md:text-sm" htmlFor="phone">
            Telefonszám
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telefonszám"
            className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-xs md:text-sm" htmlFor="weight">
            Súly (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Súly (kg)"
            className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.weight}
            onChange={handleChange}
            required
            min={30}
            max={200}
          />

          {/* SWS ID (nem kötelező) */}
          <label className="font-semibold text-xs md:text-sm" htmlFor="sws_id">
            SWS ID (nem kötelező)
          </label>
          <input
            type="text"
            id="sws_id"
            name="sws_id"
            placeholder="SWS azonosító (ha van)"
            className="border-2 border-[#e4eb34] rounded-lg px-3 md:px-4 py-2 text-sm md:text-base bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.sws_id || ''}
            onChange={handleChange}
          />
          <div className="text-xs leading-relaxed text-white/80">
            Ha még nincs SWS regisztrációd, itt tudod megtenni:{' '}
            <a
              href="https://www.sodiwseries.com/en-gb/become-sws-driver.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#62a5ff] underline"
            >
              SWS regisztráció
            </a>
            . A regisztráció során hazai pályának a <b>Téglás Gokartpályát</b> add meg. A
            regisztráció akkor teljes, ha az emailben kapott aktiváló linkre is rákattintottál.
          </div>
          <button
            type="submit"
            className="bg-[#e4eb34] text-black rounded-lg px-5 md:px-6 py-2.5 md:py-3 font-bold shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-[#e4eb34] text-base md:text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? 'Küldés...' : 'Nevezés'}
          </button>
        </form>
        {message && <p className="mt-3 md:mt-4 text-red-500 text-xs md:text-sm">{message}</p>}
      </div>
    </div>
  );
}
