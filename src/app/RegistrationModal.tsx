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
  sws_id?: string;
};

type RegistrationForm = {
  name: string;
  email: string;
  phone: string;
  weight: string;
  race: string;
  sws_id?: string;
};

export default function RegistrationModal({
  open,
  onClose,
  onSubmit,
  defaultRaceId,
  defaultRaceName,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationSubmit) => void;
  defaultRaceId?: string;
  defaultRaceName?: string;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    phone: '',
    weight: '',
    race: '',
    sws_id: '',
  });

  // Ha a modal megnyílik és van defaultRaceId, állítsuk be a race-t
  useEffect(() => {
    if (open && defaultRaceId) {
      setForm((f) => ({ ...f, race: defaultRaceId }));
    }
    if (open && !defaultRaceId) {
      setForm((f) => ({ ...f, race: '' }));
    }
  }, [open, defaultRaceId]);
  const [races, setRaces] = useState<{ id: string; name: string }[]>([]);
  const [manualRaceName, setManualRaceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await fetch('/api/races');
        const json = await res.json();
        const list: { id: string; name: string }[] = Array.isArray(json?.races) ? json.races : [];
        const hasDefault = defaultRaceId ? list.some((r) => r.id === defaultRaceId) : false;
        const injected =
          !hasDefault && defaultRaceId
            ? [{ id: defaultRaceId, name: defaultRaceName || 'Téglás Gokart GP 6. Forduló' }]
            : [];
        const options = [
          { id: '', name: t('select_placeholder') },
          ...injected,
          ...list,
          { id: 'manual', name: 'Egyéb (írd be a verseny nevét)' },
        ];
        setRaces(options);
      } catch {
        setRaces([
          { id: '', name: t('select_placeholder') },
          { id: 'manual', name: 'Egyéb (írd be a verseny nevét)' },
        ]);
      }
    })();
  }, [open, t, defaultRaceId, defaultRaceName]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!form.name || !form.email || !form.phone || !form.weight || !form.race) {
      setMessage(t('required_all'));
      setLoading(false);
      return;
    }
    const selectedRace =
      form.race === 'manual'
        ? manualRaceName.trim()
        : races.find((r) => r.id === form.race)?.name || '';
    if (!selectedRace) {
      setMessage(t('races_fetch_error'));
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
      sws_id: form.sws_id?.trim() ? form.sws_id.trim() : undefined,
    });
    setLoading(false);
    setForm({ name: '', email: '', phone: '', weight: '', race: '', sws_id: '' });
    setManualRaceName('');
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-black text-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 transition-transform transform-gpu duration-300 ease-in-out border border-[#222]"
        style={{
          ...(typeof window !== 'undefined' && window.innerWidth < 768
            ? {
                maxWidth: 'calc(100vw - 70px)',
                margin: '35px auto',
                maxHeight: 'calc(100vh - 70px)',
                height: 'auto',
                overflow: 'auto',
              }
            : { maxWidth: '400px', margin: '0 auto', overflow: 'auto' }),
        }}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-white hover:text-[#e4eb34] focus:outline-none focus:ring-2 focus:ring-[#e4eb34] rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          onClick={onClose}
          aria-label={t('close')}
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold mb-6 tracking-tight">{t('modal_title')}</h2>
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit}
          style={{ boxSizing: 'border-box' }}
        >
          <label className="font-semibold text-sm" htmlFor="name">
            {t('field_fullname')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={t('field_fullname')}
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-sm" htmlFor="email">
            {t('field_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t('field_email')}
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-sm" htmlFor="phone">
            {t('field_phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t('field_phone')}
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <label className="font-semibold text-sm" htmlFor="weight">
            {t('field_weight')}
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder={t('field_weight')}
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.weight}
            onChange={handleChange}
            required
            min={30}
            max={200}
          />
          <label className="font-semibold text-sm" htmlFor="race">
            {t('field_race')}
          </label>
          <select
            id="race"
            name="race"
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all"
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

          {form.race === 'manual' && (
            <>
              <label className="font-semibold text-sm" htmlFor="manualRaceName">
                Add meg a verseny nevét
              </label>
              <input
                type="text"
                id="manualRaceName"
                name="manualRaceName"
                placeholder="Verseny neve"
                className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
                value={manualRaceName}
                onChange={(e) => setManualRaceName(e.target.value)}
                required
              />
            </>
          )}

          {/* SWS ID (nem kötelező) */}
          <label className="font-semibold text-sm" htmlFor="sws_id">
            SWS ID (nem kötelező)
          </label>
          <input
            type="text"
            id="sws_id"
            name="sws_id"
            placeholder="SWS azonosító (ha van)"
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white"
            value={form.sws_id || ''}
            onChange={handleChange}
          />
          <div className="text-xs text-white/80 leading-relaxed">
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
            className="bg-[#e4eb34] text-black rounded-lg px-6 py-3 font-bold shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-[#e4eb34] text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? t('submit') : t('register_btn')}
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}
      </div>
    </div>
  );
}
