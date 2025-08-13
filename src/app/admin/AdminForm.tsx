'use client';
import { supabase } from '../../lib/supabaseClient';
import { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useI18n } from '../i18n/LanguageContext';
import Image from 'next/image';

type RaceOption = { id: string; name: string };

// Featured race type to avoid any
type FeaturedRace = {
  id: string;
  name: string;
  location: string;
  date: string | null;
  max_participants: number | null;
  description?: string | null;
  image_url?: string | null;
};

type RegistrationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  weight: number | string;
  race_id: string;
  race_name: string;
};

type CellEditingState = Record<
  string,
  Partial<Record<'name' | 'email' | 'phone' | 'weight' | 'race_name', boolean>>
>;

type CellDraftsState = Record<
  string,
  Partial<Pick<RegistrationRow, 'name' | 'email' | 'phone' | 'weight' | 'race_id' | 'race_name'>>
>;

export default function AdminForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    max_participants: '',
    image_url: '',
    description: '',
  });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [races, setRaces] = useState<RaceOption[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [featuredRaceId, setFeaturedRaceId] = useState('');
  const [featuredRace, setFeaturedRace] = useState<FeaturedRace | null>(null);
  const [savingFeatured, setSavingFeatured] = useState(false);
  // Per-cell inline editing state
  const [cellEditing, setCellEditing] = useState<CellEditingState>({});
  const [cellDrafts, setCellDrafts] = useState<CellDraftsState>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Versenyek lekérése
    supabase
      .from('races')
      .select('id, name')
      .then(({ data }) => {
        if (data) {
          setRaces(data);
        }
      });
  }, []);

  useEffect(() => {
    async function fetchRegistrations() {
      if (selectedRaceId) {
        const { data, error } = await supabase
          .from('registrations')
          .select('id, name, email, phone, weight, race_id, race_name')
          .eq('race_id', selectedRaceId);
        if (error) {
          console.error('Registrations fetch error:', error);
          setRegistrations([]);
          setRegistrationCount(0);
        } else {
          setRegistrations((data as RegistrationRow[]) || []);
          setRegistrationCount(data ? data.length : 0);
          // removed debug console.log
        }
      } else {
        setRegistrations([]);
        setRegistrationCount(0);
      }
    }
    fetchRegistrations();
  }, [selectedRaceId, message]);

  useEffect(() => {
    if (featuredRaceId) {
      supabase
        .from('races')
        .select('*')
        .eq('id', featuredRaceId)
        .single()
        .then(({ data }) => {
          setFeaturedRace(data || null);
        });
    } else {
      setFeaturedRace(null);
    }
  }, [featuredRaceId]);

  // Az admin oldal betöltésekor lekérjük a site_settings.featured_race_id-t, hogy a select-ben is az aktuális kiemelt verseny legyen kiválasztva
  useEffect(() => {
    async function fetchFeaturedRaceId() {
      const { data } = await supabase
        .from('site_settings')
        .select('featured_race_id')
        .eq('id', 1)
        .single();
      if (data?.featured_race_id) {
        setFeaturedRaceId(data.featured_race_id);
      }
    }
    fetchFeaturedRaceId();
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setMessage(null);
    const filePath = `next-race/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    if (error) {
      setMessage(t('img_upload_error') + ': ' + error.message);
    } else {
      const publicUrl = supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;
      if (publicUrl) {
        setForm((f) => ({ ...f, image_url: publicUrl }));
        setMessage(t('img_uploaded'));
      } else {
        setForm((f) => ({ ...f, image_url: filePath })); // fallback
        setMessage(t('img_url_missing'));
      }
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const composedDateTime = dateTime ? dateTime.toISOString() : form.date;
    try {
      const res = await fetch('/api/races', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          location: form.location,
          date: composedDateTime,
          max_participants: Number(form.max_participants),
          image_url: form.image_url,
          description: form.description,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      setMessage(t('save_success'));
      setForm({
        name: '',
        location: '',
        date: '',
        max_participants: '',
        image_url: '',
        description: '',
      });
      setDateTime(null);
    } catch (e) {
      const err = e as Error;
      setMessage(t('save_error') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveFeaturedRace() {
    if (!featuredRaceId) {
      alert(t('choose_featured_race'));
      return;
    }
    setSavingFeatured(true);
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured_race_id: featuredRaceId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      alert(t('featured_race_saved'));
    } catch (e) {
      const err = e as Error;
      alert(t('featured_race_save_error') + ': ' + err.message);
    } finally {
      setSavingFeatured(false);
    }
  }

  async function handleDeleteRegistration(id: string) {
    setLoading(true);
    // Call our server route to perform deletion with service role
    try {
      const res = await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body: { error?: string } = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(body.error || `HTTP ${res.status}`);
      }
    } catch (e) {
      const err = e as Error;
      console.error('Delete error:', err);
      setMessage(t('delete_error') + ': ' + err.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    // Refetch
    if (selectedRaceId) {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, name, email, phone, weight, race_id, race_name')
        .eq('race_id', selectedRaceId);
      if (error) {
        console.error('Refetch error:', error);
        setMessage(t('refresh_error') + ': ' + error.message);
        setRegistrations([]);
        setRegistrationCount(0);
      } else {
        setRegistrations((data as RegistrationRow[]) || []);
        setRegistrationCount(data ? data.length : 0);
      }
    }
  }

  function handleStartEditField(
    rowId: string,
    field: 'name' | 'email' | 'phone' | 'weight',
    currentValue: string | number,
  ) {
    setCellEditing((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), [field]: true } }));
    setCellDrafts((prev) => ({
      ...prev,
      [rowId]: { ...(prev[rowId] || {}), [field]: currentValue },
    }));
  }

  function handleStartEditRace(rowId: string, currentRaceId: string, currentRaceName: string) {
    setCellEditing((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), race_name: true } }));
    setCellDrafts((prev) => ({
      ...prev,
      [rowId]: { ...(prev[rowId] || {}), race_id: currentRaceId, race_name: currentRaceName },
    }));
  }

  function handleChangeEditField(
    rowId: string,
    field: 'name' | 'email' | 'phone' | 'weight',
    value: string | number,
  ) {
    setCellDrafts((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), [field]: value } }));
  }

  function handleCancelEditField(
    rowId: string,
    field: 'name' | 'email' | 'phone' | 'weight' | 'race_name',
  ) {
    setCellEditing((prev) => ({
      ...prev,
      [rowId]: { ...(prev[rowId] || {}), [field]: false },
    }));
  }

  async function handleSaveEditField(rowId: string, field: 'name' | 'email' | 'phone' | 'weight') {
    setLoading(true);
    const value = cellDrafts[rowId]?.[field];
    try {
      const res = await fetch(`/api/registrations/${rowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) {
        const body: { error?: string } = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(body.error || `HTTP ${res.status}`);
      }
    } catch (e) {
      const err = e as Error;
      console.error('Update error:', err);
      setMessage(t('update_error') + ': ' + err.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        if (field === 'weight') {
          const num = typeof value === 'number' ? value : Number(value);
          return { ...r, weight: num };
        }
        const strVal = typeof value === 'string' ? value : String(value);
        // field is one of 'name' | 'email' | 'phone'
        return { ...r, [field]: strVal } as RegistrationRow;
      }),
    );
    setCellEditing((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), [field]: false } }));
  }

  async function handleSaveEditRace(rowId: string) {
    setLoading(true);
    const draftId = cellDrafts[rowId]?.race_id as string | undefined;
    const draftName = cellDrafts[rowId]?.race_name as string | undefined;
    try {
      const res = await fetch(`/api/registrations/${rowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ race_id: draftId, race_name: draftName }),
      });
      if (!res.ok) {
        const body: { error?: string } = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(body.error || `HTTP ${res.status}`);
      }
    } catch (e) {
      const err = e as Error;
      console.error('Update error:', err);
      setMessage(t('update_error') + ': ' + err.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    // Refetch to respect current race filter (the row might move to another race)
    if (selectedRaceId) {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, name, email, phone, weight, race_id, race_name')
        .eq('race_id', selectedRaceId);
      if (error) {
        console.error('Refetch error:', error);
        setMessage(t('refresh_error') + ': ' + error.message);
      } else {
        setRegistrations((data as RegistrationRow[]) || []);
        setRegistrationCount(data ? data.length : 0);
      }
    }
    setCellEditing((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), race_name: false } }));
  }

  return (
    <>
      <label className="font-semibold" htmlFor="raceSelect">
        {t('select_race')}
      </label>
      <select
        id="raceSelect"
        className="select mb-4 max-w-xs"
        value={selectedRaceId}
        onChange={(e) => setSelectedRaceId(e.target.value)}
      >
        <option value="">{t('select_placeholder')}</option>
        {races.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <label className="font-semibold" htmlFor="featuredRaceSelect">
        {t('select_featured_race')}
      </label>
      <select
        id="featuredRaceSelect"
        className="select mb-2 max-w-xs"
        value={featuredRaceId}
        onChange={(e) => setFeaturedRaceId(e.target.value)}
      >
        <option value="">{t('select_placeholder')}</option>
        {races.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name} ({r.id})
          </option>
        ))}
      </select>
      <div className="mb-4">
        <button className="btn btn-outline" onClick={saveFeaturedRace} disabled={savingFeatured}>
          {savingFeatured ? t('save') + '...' : t('save_featured_race')}
        </button>
      </div>

      {selectedRaceId && (
        <div className="mb-4">
          {t('registrations_count')}: <span className="font-bold">{registrationCount}</span>
        </div>
      )}

      {selectedRaceId && (
        <div className="overflow-x-auto mb-8">
          <table className="table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('email')}</th>
                <th>{t('phone')}</th>
                <th>{t('weight')}</th>
                <th>{t('race')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length > 0 ? (
                registrations.map((reg) => (
                  <tr key={reg.id}>
                    {/* Név */}
                    <td className="border border-gray-300 px-2 py-1">
                      {cellEditing[reg.id]?.name ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={(cellDrafts[reg.id]?.name ?? reg.name) as string}
                            onChange={(e) => handleChangeEditField(reg.id, 'name', e.target.value)}
                            className="text-black bg-transparent border border-gray-300 rounded px-1 outline-none"
                          />
                          <button
                            title={t('save')}
                            className="text-green-600"
                            onClick={() => handleSaveEditField(reg.id, 'name')}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title={t('cancel')}
                            className="text-gray-500"
                            onClick={() => handleCancelEditField(reg.id, 'name')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{reg.name}</span>
                          <button
                            title={t('edit')}
                            className="text-blue-600"
                            onClick={() => handleStartEditField(reg.id, 'name', reg.name)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    {/* Email */}
                    <td className="border border-gray-300 px-2 py-1">
                      {cellEditing[reg.id]?.email ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={(cellDrafts[reg.id]?.email ?? reg.email) as string}
                            onChange={(e) => handleChangeEditField(reg.id, 'email', e.target.value)}
                            className="text-black bg-transparent border border-gray-300 rounded px-1 outline-none"
                          />
                          <button
                            title={t('save')}
                            className="text-green-600"
                            onClick={() => handleSaveEditField(reg.id, 'email')}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title={t('cancel')}
                            className="text-gray-500"
                            onClick={() => handleCancelEditField(reg.id, 'email')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{reg.email}</span>
                          <button
                            title={t('edit')}
                            className="text-blue-600"
                            onClick={() => handleStartEditField(reg.id, 'email', reg.email)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    {/* Telefon */}
                    <td className="border border-gray-300 px-2 py-1">
                      {cellEditing[reg.id]?.phone ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={(cellDrafts[reg.id]?.phone ?? reg.phone) as string}
                            onChange={(e) => handleChangeEditField(reg.id, 'phone', e.target.value)}
                            className="text-black bg-transparent border border-gray-300 rounded px-1 outline-none"
                          />
                          <button
                            title={t('save')}
                            className="text-green-600"
                            onClick={() => handleSaveEditField(reg.id, 'phone')}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title={t('cancel')}
                            className="text-gray-500"
                            onClick={() => handleCancelEditField(reg.id, 'phone')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{reg.phone}</span>
                          <button
                            title={t('edit')}
                            className="text-blue-600"
                            onClick={() => handleStartEditField(reg.id, 'phone', reg.phone)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    {/* Súly */}
                    <td className="border border-gray-300 px-2 py-1">
                      {cellEditing[reg.id]?.weight ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={(cellDrafts[reg.id]?.weight ?? reg.weight) as number}
                            onChange={(e) =>
                              handleChangeEditField(reg.id, 'weight', e.target.value)
                            }
                            className="text-black bg-transparent border border-gray-300 rounded px-1 outline-none"
                          />
                          <button
                            title={t('save')}
                            className="text-green-600"
                            onClick={() => handleSaveEditField(reg.id, 'weight')}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title={t('cancel')}
                            className="text-gray-500"
                            onClick={() => handleCancelEditField(reg.id, 'weight')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{reg.weight}</span>
                          <button
                            title={t('edit')}
                            className="text-blue-600"
                            onClick={() => handleStartEditField(reg.id, 'weight', reg.weight)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    {/* Verseny (race_name) - szerkeszthető selecttel */}
                    <td className="border border-gray-300 px-2 py-1">
                      {cellEditing[reg.id]?.race_name ? (
                        <div className="flex items-center gap-2">
                          <select
                            className="bg-white text-black border border-gray-300 rounded px-1 py-0.5"
                            value={(cellDrafts[reg.id]?.race_id ?? reg.race_id) as string}
                            onChange={(e) => {
                              const newId = e.target.value;
                              const race = races.find((r) => r.id === newId);
                              setCellDrafts((prev) => ({
                                ...prev,
                                [reg.id]: {
                                  ...(prev[reg.id] || {}),
                                  race_id: newId,
                                  race_name: race?.name || '',
                                },
                              }));
                            }}
                          >
                            {races.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          <button
                            title={t('save')}
                            className="text-green-600"
                            onClick={() => handleSaveEditRace(reg.id)}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title={t('cancel')}
                            className="text-gray-500"
                            onClick={() => handleCancelEditField(reg.id, 'race_name')}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{reg.race_name || ''}</span>
                          <button
                            title={t('edit')}
                            className="text-blue-600"
                            onClick={() => handleStartEditRace(reg.id, reg.race_id, reg.race_name)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    {/* Műveletek: csak törlés */}
                    <td className="border border-gray-300 px-2 py-1 flex gap-2">
                      <button
                        className="text-red-600"
                        onClick={() => handleDeleteRegistration(reg.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="border border-gray-300 px-2 py-4 text-center text-gray-500"
                  >
                    {t('none_registrations')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {featuredRace && (
        <div className="card mb-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-2">{t('featured_race_admin_title')}</h2>
          <p>
            <span className="font-semibold">{t('name')}:</span> {featuredRace.name}
          </p>
          <p>
            <span className="font-semibold">{t('location')}:</span> {featuredRace.location}
          </p>
          <p>
            <span className="font-semibold">{t('time')}:</span>{' '}
            {featuredRace.date ? new Date(featuredRace.date).toLocaleString() : ''}
          </p>
          <p>
            <span className="font-semibold">{t('max_capacity_label')}:</span>{' '}
            {featuredRace.max_participants}
          </p>
          <p>
            <span className="font-semibold">{t('description')}:</span> {featuredRace.description}
          </p>
          {featuredRace.image_url && (
            <div className="w-full h-48 relative mt-4">
              <Image
                src={featuredRace.image_url}
                alt={t('image')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          )}
        </div>
      )}

      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSave}>
        <label className="font-semibold" htmlFor="name">
          {t('race_name_label')}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input"
          required
        />

        <label className="font-semibold" htmlFor="location">
          {t('location')}
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="input"
          required
        />

        <label className="font-semibold" htmlFor="date">
          {t('time')}
        </label>
        <div className="input p-0">
          <DatePicker
            selected={dateTime}
            onChange={(d) => setDateTime(d)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy.MM.dd HH:mm"
            placeholderText={t('pick_datetime')}
            className="bg-white text-black outline-none"
            calendarClassName="bg-white text-black"
            popperClassName="text-black"
          />
        </div>

        <label className="font-semibold" htmlFor="max_participants">
          {t('max_capacity_label')}
        </label>
        <input
          type="number"
          name="max_participants"
          id="max_participants"
          value={form.max_participants}
          onChange={(e) => setForm((f) => ({ ...f, max_participants: e.target.value }))}
          className="input"
          required
          min={1}
        />

        <label className="font-semibold" htmlFor="image_url">
          {t('image')}
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="input"
        />

        {form.image_url && (
          <div className="w-full h-48 relative mt-2">
            <Image
              src={form.image_url}
              alt={t('image')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        )}

        <label className="font-semibold" htmlFor="description">
          {t('description')}
        </label>
        <textarea
          name="description"
          id="description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="textarea"
          required
        />

        <button type="submit" className="btn btn-primary" disabled={loading || !form.image_url}>
          {loading ? t('save') + '...' : t('save')}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </>
  );
}
