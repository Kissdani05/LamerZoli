'use client';
import { useState } from 'react';

interface NewRaceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewRaceModal({ open, onClose, onSuccess }: NewRaceModalProps) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    formats: {
      sprint: false,
      endurance: false,
      junior: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        formats: {
          ...prev.formats,
          [name]: checked,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name || !form.location || !form.date) {
      setError('Minden mező kitöltése kötelező!');
      setLoading(false);
      return;
    }

    const selectedFormats = Object.entries(form.formats)
      .filter(([, selected]) => selected)
      .map(([format]) => format.charAt(0).toUpperCase() + format.slice(1));

    if (selectedFormats.length === 0) {
      setError('Válassz legalább egy verseny formátumot!');
      setLoading(false);
      return;
    }

    try {
      // Dátum formázása másodperc nélkül
      const dateObj = new Date(form.date);
      dateObj.setSeconds(0);
      const formattedDate = dateObj.toISOString();

      const res = await fetch('/api/races', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          location: form.location,
          date: formattedDate,
          categories: selectedFormats,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }

      alert('Verseny sikeresen létrehozva!');
      setForm({
        name: '',
        location: '',
        date: '',
        formats: { sprint: false, endurance: false, junior: false },
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a verseny létrehozásakor.');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-black text-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 transition-transform transform-gpu duration-300 ease-in-out border-[3px] border-white my-4 sm:my-8 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-white hover:text-[#e4eb34] focus:outline-none focus:ring-2 focus:ring-[#e4eb34] rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          onClick={onClose}
          aria-label="Bezárás"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Új Verseny Létrehozása</h2>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          <label className="font-semibold text-sm" htmlFor="name">
            Verseny neve
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="pl. Téglás Gokart GP 2026 1. Forduló"
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white/50"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="font-semibold text-sm" htmlFor="location">
            Verseny helyszíne
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="pl. Téglás F1 Gokartpálya"
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all placeholder:text-white/50"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label className="font-semibold text-sm" htmlFor="date">
            Dátum és időpont
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            className="border-2 border-[#e4eb34] rounded-lg px-4 py-2 bg-white/10 text-white focus:ring-2 focus:ring-[#e4eb34] transition-all"
            value={form.date}
            onChange={handleChange}
            required
          />

          <fieldset className="border-2 border-[#e4eb34] rounded-lg px-4 py-3">
            <legend className="font-semibold text-sm px-2">Verseny formátumok</legend>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="sprint"
                  checked={form.formats.sprint}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#e4eb34]"
                />
                <span>Sprint</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="endurance"
                  checked={form.formats.endurance}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#e4eb34]"
                />
                <span>Endurance</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="junior"
                  checked={form.formats.junior}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#e4eb34]"
                />
                <span>Junior</span>
              </label>
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-[#e4eb34] text-black rounded-lg px-6 py-3 font-bold shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-[#e4eb34] text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? 'Létrehozás...' : 'Verseny Létrehozása'}
          </button>
        </form>
      </div>
    </div>
  );
}
