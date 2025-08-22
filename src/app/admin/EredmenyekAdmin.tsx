'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

export default function EredmenyekAdmin() {
  const [form, setForm] = useState({
    name: '',
    date: '',
    location: '',
    participants: 1,
    image_url: '',
  });
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState([{ name: '' }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);
    setMessage(null);
    let uploadFile = file;
    if (file.size > 1024 * 1024) {
      // Resize image to max 1MB
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      await new Promise((res) => {
        img.onload = res;
      });
      const canvas = document.createElement('canvas');
      const maxW = 1200,
        maxH = 1200;
      let w = img.width,
        h = img.height;
      if (w > maxW || h > maxH) {
        if (w > h) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        } else {
          w = Math.round((w * maxH) / h);
          h = maxH;
        }
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, w, h);
      let quality = 0.92;
      let blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', quality),
      );
      while (blob && blob.size > 1024 * 1024 && quality > 0.5) {
        quality -= 0.07;
        blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, 'image/jpeg', quality),
        );
      }
      if (blob) {
        uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
          type: 'image/jpeg',
        });
      }
    }
    const filePath = `results/${Date.now()}_${uploadFile.name}`;
    const { error } = await supabase.storage.from('images').upload(filePath, uploadFile, {
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
    setImageLoading(false);
  }

  function handleRowChange(idx: number, value: string) {
    setRows((rows) => rows.map((row, i) => (i === idx ? { name: value } : row)));
  }

  function handleAddRow() {
    setRows((rows) => [...rows, { name: '' }]);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    // Verseny adatok mentése
    const { error: raceError, data: raceData } = await supabase
      .from('results')
      .insert({
        name: form.name,
        date: form.date,
        location: form.location,
        participants: form.participants,
        image_url: form.image_url,
      })
      .select();
    if (raceError || !raceData || !raceData[0]?.id) {
      setMessage('Verseny mentése sikertelen: ' + (raceError?.message || 'Ismeretlen hiba'));
      setSaving(false);
      return;
    }
    // Indulók mentése
    const raceId = raceData[0].id;
    const rowsToInsert = rows.map((row, idx) => ({
      race_id: raceId,
      position: idx + 1,
      name: row.name,
    }));
    const { error: rowsError } = await supabase.from('result_participants').insert(rowsToInsert);
    if (rowsError) {
      setMessage('Indulók mentése sikertelen: ' + rowsError.message);
      setSaving(false);
      return;
    }
    setMessage('Eredmények sikeresen mentve!');
    setSaving(false);
    setForm({ name: '', date: '', location: '', participants: 1, image_url: '' });
    setRows([{ name: '' }]);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Eredmények admin</h1>
      <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSave}>
        <label className="font-semibold">Kép</label>
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

        <label className="font-semibold">Verseny neve</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input"
          required
        />

        <label className="font-semibold">Verseny dátuma</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="input"
          required
        />

        <label className="font-semibold">Helyszín</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="input"
          required
        />

        <label className="font-semibold">Indulók száma</label>
        <input
          type="number"
          min={1}
          value={form.participants}
          onChange={(e) => setForm((f) => ({ ...f, participants: Number(e.target.value) }))}
          className="input"
          required
        />

        <h2 className="text-lg font-bold mt-6 mb-2">Indulók</h2>
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border w-16 text-white">#</th>
              <th className="p-2 border text-white">Név</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2 border text-center">{idx + 1}</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleRowChange(idx, e.target.value)}
                    className="input w-full"
                    required
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="p-2 border text-center">
                <button type="button" className="text-blue-600 text-xl" onClick={handleAddRow}>
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={saving || imageLoading}
        >
          {saving ? 'Mentés...' : 'Mentés'}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
