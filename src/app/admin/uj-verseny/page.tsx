'use client';
// ...existing code...
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function UjVersenyPage() {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setMessage('Kép feltöltési hiba: ' + error.message);
    } else {
      const publicUrl = supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;
      if (publicUrl) {
        setForm((f) => ({ ...f, image_url: publicUrl }));
        setMessage('Kép feltöltve!');
      } else {
        setForm((f) => ({ ...f, image_url: filePath }));
        setMessage('Kép URL nem elérhető!');
      }
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const composedDateTime = dateTime ? dateTime.toISOString() : form.date;
    const { error } = await supabase.from('races').insert({
      name: form.name,
      location: form.location,
      date: composedDateTime,
      max_participants: Number(form.max_participants),
      image_url: form.image_url,
      description: form.description,
    });
    if (!error) {
      setMessage('Verseny sikeresen létrehozva!');
      setForm({
        name: '',
        location: '',
        date: '',
        max_participants: '',
        image_url: '',
        description: '',
      });
      setDateTime(null);
    } else {
      setMessage('Hiba történt: ' + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Új Verseny létrehozása</h1>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSave}>
        <label className="font-semibold" htmlFor="name">
          Név
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
          Helyszín
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
          Időpont
        </label>
        <div className="input p-0">
          <DatePicker
            selected={dateTime}
            onChange={(d) => setDateTime(d)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy.MM.dd HH:mm"
            placeholderText="Válassz dátumot és időpontot"
            className="bg-white text-black outline-none"
            calendarClassName="bg-white text-black"
            popperClassName="text-black"
          />
        </div>

        <label className="font-semibold" htmlFor="max_participants">
          Maximális létszám
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
          Kép
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
              alt="Kép"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        )}

        <label className="font-semibold" htmlFor="description">
          Leírás
        </label>
        <textarea
          name="description"
          id="description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="textarea"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading || !form.image_url}
        >
          {loading ? 'Mentés...' : 'Mentés'}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
