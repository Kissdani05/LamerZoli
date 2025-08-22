'use client';
import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function BlogAdmin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setUploading(true);
    setError('');
    let imageUrl = '';
    if (image) {
      let uploadFile = image;
      if (image.size > 1024 * 1024) {
        // Resize image to max 1MB
        const img = document.createElement('img');
        img.src = URL.createObjectURL(image);
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
          uploadFile = new File([blob], image.name.replace(/\.[^.]+$/, '.jpg'), {
            type: 'image/jpeg',
          });
        }
      }
      // fileExt változó törölve, nem használt
      const filePath = `blog/${Date.now()}_${uploadFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, uploadFile, {
          cacheControl: '3600',
          upsert: true,
        });
      if (uploadError) {
        setError('Kép feltöltése sikertelen: ' + uploadError.message);
        setUploading(false);
        return;
      }
      const publicUrl = supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;
      imageUrl = publicUrl || '';
      // Kép előnézet beállítása
      setImagePreview(imageUrl);
    }
    const { error: dbError } = await supabase.from('blog').insert([
      {
        title,
        content,
        read_time: readTime,
        image_url: imageUrl,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
    if (dbError) {
      setError('Mentés sikertelen: ' + dbError.message);
    } else {
      setSuccess(true);
      setTitle('');
      setContent('');
      setReadTime('');
      setImage(null);
      setImagePreview('');
    }
    setUploading(false);
  }

  const [imagePreview, setImagePreview] = useState('');

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Blog Admin</h1>
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Cím"
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Cikk tartalma"
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Olvasási idő (pl. 5 perc)"
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold"
          value={readTime}
          onChange={(e) => setReadTime(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Kép előnézet"
            width={400}
            height={256}
            className="rounded-xl shadow-lg w-full max-h-64 object-cover mx-auto"
          />
        )}
        <button
          className="w-full px-4 py-3 rounded-xl font-bold bg-yellow-400 text-gray-900 shadow hover:bg-yellow-300 transition text-lg mt-2"
          onClick={handleSave}
          disabled={uploading}
        >
          {uploading ? 'Mentés...' : 'Mentés'}
        </button>
        {success && <div className="text-green-400 font-bold text-center">Sikeres mentés!</div>}
        {error && <div className="text-red-400 font-bold text-center">{error}</div>}
      </div>
    </div>
  );
}
