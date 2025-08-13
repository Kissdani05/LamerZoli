// races tábla integráció a nevezési modalho
'use client';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useI18n } from './i18n/LanguageContext';

type RegistrationSubmit = {
  name: string;
  email: string;
  phone: string;
  weight: number;
  race: string;
  race_name: string;
};

type RegistrationForm = {
  name: string;
  email: string;
  phone: string;
  weight: string;
  race: string;
};

export default function RegistrationModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationSubmit) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    phone: '',
    weight: '',
    race: '',
  });
  const [races, setRaces] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      supabase
        .from('races')
        .select('id, name')
        .then(({ data, error }) => {
          if (error) {
            setMessage(t('races_fetch_error') + ': ' + error.message);
            setRaces([{ id: '', name: t('select_placeholder') }]);
          } else if (data && data.length > 0) {
            setRaces([
              { id: '', name: t('select_placeholder') },
              ...data.map((r: { id: string; name: string }) => ({ id: r.id, name: r.name })),
            ]);
          } else {
            setRaces([{ id: '', name: t('no_races') }]);
          }
        });
    }
  }, [open, t]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
    const selectedRace = races.find((r) => r.id === form.race)?.name || '';
    await onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      weight: Number(form.weight),
      race: form.race,
      race_name: selectedRace,
    });
    setLoading(false);
    setForm({ name: '', email: '', phone: '', weight: '', race: '' });
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md z-10">
        <button
          className="absolute top-4 right-4 text-2xl text-black hover:text-gray-600"
          onClick={onClose}
          aria-label={t('close')}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">{t('modal_title')}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="font-semibold" htmlFor="name">
            {t('field_fullname')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={t('field_fullname')}
            className="border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="font-semibold" htmlFor="email">
            {t('field_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t('field_email')}
            className="border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="font-semibold" htmlFor="phone">
            {t('field_phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t('field_phone')}
            className="border rounded px-3 py-2"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label className="font-semibold" htmlFor="weight">
            {t('field_weight')}
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder={t('field_weight')}
            className="border rounded px-3 py-2"
            value={form.weight}
            onChange={handleChange}
            required
            min={30}
            max={200}
          />

          <label className="font-semibold" htmlFor="race">
            {t('field_race')}
          </label>
          <select
            id="race"
            name="race"
            className="border rounded px-3 py-2"
            value={form.race}
            onChange={handleChange}
            required
          >
            {races.map((r) => (
              <option key={r.id} value={r.id} className="bg-white text-black">
                {r.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-black text-white rounded px-4 py-2 font-bold"
            disabled={loading}
          >
            {loading ? t('submit') : t('register_btn')}
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}
