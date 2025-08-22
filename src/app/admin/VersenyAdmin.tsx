'use client';
import { supabase } from '../../lib/supabaseClient';
import { useState, useEffect } from 'react';
// ...existing code...
// ...existing code...
import 'react-datepicker/dist/react-datepicker.css';
// ...existing code...
import Image from 'next/image';

type RaceOption = { id: string; name: string };
type FeaturedRace = {
  id: string;
  name: string;
  location: string;
  date: string | null;
  max_participants: number | null;
  description?: string | null;
  image_url?: string | null;
};

export default function VersenyAdmin() {
  // ...existing code...
  const [races, setRaces] = useState<RaceOption[]>([]);
  const [featuredRaceId, setFeaturedRaceId] = useState('');
  const [featuredRace, setFeaturedRace] = useState<FeaturedRace | null>(null);
  const [savingFeatured, setSavingFeatured] = useState(false);

  useEffect(() => {
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
    // ...existing code...
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Verseny Admin</h1>
      <label className="font-semibold mb-2 block" htmlFor="featured-race-select">
        Kiemelt verseny a weboldalon:
      </label>
      <select
        id="featured-race-select"
        value={featuredRaceId}
        onChange={(e) => setFeaturedRaceId(e.target.value)}
        className="input mb-6"
      >
        <option value="">-- Válassz kiemelt versenyt --</option>
        {races.map((race) => (
          <option key={race.id} value={race.id}>
            {race.name}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary mb-4"
        onClick={async () => {
          if (!featuredRaceId) {
            alert('Válassz kiemelt versenyt!');
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
            alert('Kiemelt verseny sikeresen mentve!');
          } catch {
            alert('Hiba a kiemelt verseny mentésénél!');
          } finally {
            setSavingFeatured(false);
          }
        }}
        disabled={savingFeatured}
      >
        {savingFeatured ? 'Mentés...' : 'Mentés'}
      </button>

      {featuredRace && (
        <div className="mt-8 p-6 rounded-xl shadow-lg bg-white/80 max-w-xl">
          {/* Kép feltöltés adminban: max 1MB, átméretezés */}
          {featuredRace.image_url && (
            <div className="w-full h-64 relative mb-4 rounded-xl overflow-hidden">
              <Image
                src={featuredRace.image_url}
                alt={featuredRace.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Kép feltöltő mező (példa, implementáld a mentésnél): */}
          {/* <input type="file" accept="image/*" onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;
            let uploadFile = file;
            if (file.size > 1024 * 1024) {
              const img = document.createElement('img');
              img.src = URL.createObjectURL(file);
              await new Promise(res => { img.onload = res; });
              const canvas = document.createElement('canvas');
              const maxW = 1200, maxH = 1200;
              let w = img.width, h = img.height;
              if (w > maxW || h > maxH) {
                if (w > h) { h = Math.round(h * maxW / w); w = maxW; }
                else { w = Math.round(w * maxH / h); h = maxH; }
              }
              canvas.width = w; canvas.height = h;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, w, h);
              let quality = 0.92;
              let blob = await new Promise<Blob|null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
              while (blob && blob.size > 1024 * 1024 && quality > 0.5) {
                quality -= 0.07;
                blob = await new Promise<Blob|null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
              }
              if (blob) {
                uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
              }
            }
            // Feltöltés supabase.storage.from('images').upload(...)
          }} /> */}
          <h2 className="text-xl font-bold mb-2">{featuredRace.name}</h2>
          <div className="mb-1">
            <strong>Helyszín:</strong> {featuredRace.location}
          </div>
          <div className="mb-1">
            <strong>Dátum:</strong>{' '}
            {featuredRace.date ? new Date(featuredRace.date).toLocaleString() : '-'}
          </div>
          <div className="mb-1">
            <strong>Max. férőhely:</strong> {featuredRace.max_participants ?? '-'}
          </div>
          <div className="mb-1">
            <strong>Leírás:</strong> {featuredRace.description ?? '-'}
          </div>
        </div>
      )}
    </div>
  );
}
