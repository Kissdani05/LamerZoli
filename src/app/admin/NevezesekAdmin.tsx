'use client';
import { useState, useEffect, useCallback } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabaseClient';

type RaceData = {
  id: string;
  name: string;
  categories?: string[];
};

declare global {
  interface Window {
    __racesData?: RaceData[];
  }
}

type RegistrationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  weight: number | string;
  race_id: string;
  race_name: string;
  category?: string | null;
  team_size?: number | null;
  sws_id?: string | null;
  status?: 'pending' | 'accepted' | 'rejected' | string;
};

export default function NevezesekAdmin() {
  const [raceNames, setRaceNames] = useState<string[]>([]);
  const [selectedRaceName, setSelectedRaceName] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [editing, setEditing] = useState<{ id: string; field: keyof RegistrationRow } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    weight: '',
    category: '',
    team_size: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (id: string, field: keyof RegistrationRow, value: string) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  const fetchRaces = async () => {
    try {
      const { data, error } = await supabase
        .from('races')
        .select('id, name, categories')
        .order('date', { ascending: true });

      if (error) {
        console.error('Races fetch error:', error);
        return;
      }

      const racesList = (data || []).map((r) => r.name).filter(Boolean);
      setRaceNames(racesList);
      // Auto-select first race if none selected or selection no longer exists
      if (racesList.length > 0) {
        setSelectedRaceName((prev) => (racesList.includes(prev) ? prev : racesList[0]));
      } else {
        setSelectedRaceName('');
      }

      // Store races with categories for later lookup
      window.__racesData = data;
    } catch (err) {
      console.error('Races fetch exception:', err);
    }
  };

  const fetchRegistrations = useCallback(async (retries = 3) => {
    try {
      const res = await fetch('/api/registrations');
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchRegistrations(retries - 1);
        }
        setRegistrations([]);
        setErrorMsg('Lekérdezési hiba: ' + (json?.error || res.statusText || 'Ismeretlen hiba'));
        return;
      }
      const json = await res.json();
      const rows = (json.registrations || []) as RegistrationRow[];
      setRegistrations(rows);
      setErrorMsg('');
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchRegistrations(retries - 1);
      }
      console.error('Registrations fetch exception:', err);
      setRegistrations([]);
      setErrorMsg('Hálózati hiba. Próbálja meg újra!');
    }
  }, []);

  const handleEditSave = async () => {
    if (!editing) return;
    setLoadingEdit(true);
    setErrorMsg('');
    setSuccessMsg('');
    const { id, field } = editing;
    const res = await fetch(`/api/registrations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: editValue }),
    });
    if (res.ok) {
      setSuccessMsg('Sikeres szerkesztés!');
      await fetchRegistrations();
    } else {
      const json = await res.json().catch(() => ({}));
      setErrorMsg('Szerkesztés sikertelen! ' + (json?.error || 'Ismeretlen hiba'));
    }
    setEditing(null);
    setEditValue('');
    setLoadingEdit(false);
    setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 2000);
  };

  const handleEditCancel = () => {
    setEditing(null);
    setEditValue('');
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete(id);
    setErrorMsg('');
    setSuccessMsg('');
    const res = await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSuccessMsg('Sikeres törlés!');
      await fetchRegistrations();
    } else {
      const json = await res.json().catch(() => ({}));
      setErrorMsg('Törlés sikertelen! ' + (json?.error || 'Ismeretlen hiba'));
    }
    setLoadingDelete(null);
    setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 2000);
  };

  useEffect(() => {
    fetchRaces();
    fetchRegistrations();

    // Listen for custom event when a new race is created
    const handleRacesUpdated = () => {
      fetchRaces();
    };
    window.addEventListener('racesUpdated', handleRacesUpdated);

    return () => {
      window.removeEventListener('racesUpdated', handleRacesUpdated);
    };
  }, [fetchRegistrations]);

  // Update available categories when selected race changes
  useEffect(() => {
    if (selectedRaceName) {
      const racesData = window.__racesData || [];
      const race = racesData.find((r) => r.name === selectedRaceName);
      if (race && race.categories && Array.isArray(race.categories)) {
        setAvailableCategories(race.categories);
        // Auto-select first category
        if (race.categories.length > 0) {
          const categories = race.categories;
          setSelectedCategory((prev) => (categories.includes(prev) ? prev : categories[0]));
        } else {
          setSelectedCategory('');
        }
      } else {
        setAvailableCategories([]);
        setSelectedCategory('');
      }
    } else {
      setAvailableCategories([]);
      setSelectedCategory('');
    }
  }, [selectedRaceName]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold gradient-text mb-2">Nevezések Admin</h1>
          <p className="text-white/60">Nevezések kezelése és szűrése versenyenként</p>
        </div>

        {/* Control Panel Card */}
        <div className="card mb-6 p-6">
          <div className="flex flex-col gap-4">
            {/* First row: Race and Category filters */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Verseny szűrés
                </label>
                <select
                  className="input w-full"
                  value={selectedRaceName}
                  onChange={(e) => setSelectedRaceName(e.target.value)}
                  aria-label="Verseny szűrés"
                >
                  {raceNames.map((rn) => (
                    <option key={rn} value={rn}>
                      {rn}
                    </option>
                  ))}
                </select>
              </div>
              {availableCategories.length > 0 && (
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold mb-2 text-white/80">
                    Kategória szűrés
                  </label>
                  <select
                    className="input w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Kategória szűrés"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {/* Second row: Action buttons */}
            <div className="flex gap-3 w-full">
              <button
                className="btn btn-outline flex-1 sm:flex-none"
                onClick={() => {
                  // Export current filtered rows (selected race and category) to CSV
                  const filtered = registrations.filter((r) => {
                    const matchRace = selectedRaceName ? r.race_name === selectedRaceName : true;
                    const matchCategory = selectedCategory ? r.category === selectedCategory : true;
                    return matchRace && matchCategory;
                  });
                  const headers = [
                    'ID',
                    'Név',
                    'Email',
                    'Telefon',
                    'Súly',
                    'Kategória',
                    'Csapat létszám',
                    'SWS ID',
                    'Verseny azonosító',
                    'Verseny név',
                    'Státusz',
                  ];
                  const toCell = (v: unknown) => {
                    const s = String(v ?? '');
                    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
                      return '"' + s.replace(/"/g, '""') + '"';
                    }
                    return s;
                  };
                  const rows = filtered.map((r) => [
                    r.id,
                    r.name,
                    r.email,
                    r.phone,
                    r.weight,
                    r.category ?? '-',
                    r.team_size ?? '-',
                    r.sws_id ?? '-',
                    r.race_id ?? '',
                    r.race_name ?? '',
                    r.status ?? 'pending',
                  ]);
                  const csv = [headers, ...rows]
                    .map((line) => line.map(toCell).join(','))
                    .join('\n');
                  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'nevezesek.csv';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                📥 CSV letöltése
              </button>
              <button
                className="btn btn-primary flex-1 sm:flex-none"
                onClick={() => setShowAddModal(true)}
                disabled={!selectedRaceName}
                title={selectedRaceName ? '' : 'Válassz versenyt'}
              >
                ➕ Új nevező
              </button>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="card mb-6 p-4 bg-red-500/10 border-red-500/30 backdrop-blur-xl">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-red-200">{errorMsg}</span>
              </div>
              <button
                onClick={() => fetchRegistrations()}
                className="btn btn-primary text-sm px-4 py-2"
              >
                🔄 Újra próbál
              </button>
            </div>
          </div>
        )}
        {successMsg && (
          <div className="card mb-6 p-4 bg-green-500/10 border-green-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-green-200">{successMsg}</span>
            </div>
          </div>
        )}

        {/* Registrations Table Card */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold gradient-text">
              Nevezések (
              {
                registrations.filter((r) => {
                  const matchRace = selectedRaceName ? r.race_name === selectedRaceName : true;
                  const matchCategory = selectedCategory ? r.category === selectedCategory : true;
                  return matchRace && matchCategory;
                }).length
              }
              )
            </h2>
          </div>
          {registrations.filter((r) => {
            const matchRace = selectedRaceName ? r.race_name === selectedRaceName : true;
            const matchCategory = selectedCategory ? r.category === selectedCategory : true;
            return matchRace && matchCategory;
          }).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-3 text-left text-white/80 font-semibold">Név</th>
                    <th className="p-3 text-left text-white/80 font-semibold">Email</th>
                    <th className="p-3 text-left text-white/80 font-semibold">Telefon</th>
                    <th className="p-3 text-left text-white/80 font-semibold">Súly</th>
                    <th className="p-3 text-left text-white/80 font-semibold">Kategória</th>
                    <th className="p-3 text-left text-white/80 font-semibold">Csapat</th>
                    <th className="p-3 text-left text-white/80 font-semibold">SWS ID</th>
                    <th className="p-3 text-center text-white/80 font-semibold">Státusz</th>
                    <th className="p-3 text-center text-white/80 font-semibold">Művelet</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations
                    .filter((r) => {
                      const matchRace = selectedRaceName ? r.race_name === selectedRaceName : true;
                      const matchCategory = selectedCategory
                        ? r.category === selectedCategory
                        : true;
                      return matchRace && matchCategory;
                    })
                    .map((reg) => (
                      <tr
                        key={reg.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-3">
                          {editing && editing.id === reg.id && editing.field === 'name' ? (
                            <div className="flex items-center gap-2">
                              <input
                                className="input text-sm flex-1"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditSave}
                                disabled={loadingEdit}
                              >
                                ✓
                              </button>
                              <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditCancel}
                                disabled={loadingEdit}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{reg.name}</span>
                              <button
                                className="opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => handleEditClick(reg.id, 'name', String(reg.name))}
                                title="Szerkesztés"
                              >
                                <PencilSquareIcon className="w-4 h-4 text-[#e4eb34]" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {editing && editing.id === reg.id && editing.field === 'email' ? (
                            <div className="flex items-center gap-2">
                              <input
                                className="input text-sm flex-1"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditSave}
                                disabled={loadingEdit}
                              >
                                ✓
                              </button>
                              <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditCancel}
                                disabled={loadingEdit}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{reg.email}</span>
                              <button
                                className="opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => handleEditClick(reg.id, 'email', String(reg.email))}
                                title="Szerkesztés"
                              >
                                <PencilSquareIcon className="w-4 h-4 text-[#e4eb34]" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {editing && editing.id === reg.id && editing.field === 'phone' ? (
                            <div className="flex items-center gap-2">
                              <input
                                className="input text-sm flex-1"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditSave}
                                disabled={loadingEdit}
                              >
                                ✓
                              </button>
                              <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditCancel}
                                disabled={loadingEdit}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{reg.phone}</span>
                              <button
                                className="opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => handleEditClick(reg.id, 'phone', String(reg.phone))}
                                title="Szerkesztés"
                              >
                                <PencilSquareIcon className="w-4 h-4 text-[#e4eb34]" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {editing && editing.id === reg.id && editing.field === 'weight' ? (
                            <div className="flex items-center gap-2">
                              <input
                                className="input text-sm flex-1"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditSave}
                                disabled={loadingEdit}
                              >
                                ✓
                              </button>
                              <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                                onClick={handleEditCancel}
                                disabled={loadingEdit}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{reg.weight} kg</span>
                              <button
                                className="opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() =>
                                  handleEditClick(reg.id, 'weight', String(reg.weight))
                                }
                                title="Szerkesztés"
                              >
                                <PencilSquareIcon className="w-4 h-4 text-[#e4eb34]" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="text-white/80">{reg.category || '-'}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-white/80">
                            {reg.team_size ? `${reg.team_size} fő` : '-'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-white/80">{reg.sws_id || '-'}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.status === 'accepted'
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : reg.status === 'rejected'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            }`}
                          >
                            {reg.status === 'accepted'
                              ? '✓ Elfogadva'
                              : reg.status === 'rejected'
                                ? '✕ Elutasítva'
                                : '⏳ Függőben'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2 justify-center flex-wrap">
                            <button
                              className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleDelete(reg.id)}
                              disabled={loadingDelete === reg.id}
                            >
                              {loadingDelete === reg.id ? '⏳ Törlés...' : '🗑️ Törlés'}
                            </button>
                            {(!reg.status || reg.status === 'pending') && (
                              <>
                                <button
                                  className="bg-green-500/90 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50"
                                  onClick={async () => {
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                    const res = await fetch(`/api/registrations/${reg.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ status: 'accepted' }),
                                    });
                                    const body = await res.json().catch(() => ({}));
                                    if (!res.ok) {
                                      setErrorMsg(
                                        String(body?.error || 'Hiba a státusz állításnál'),
                                      );
                                    } else {
                                      setSuccessMsg('Elfogadva. Email elküldve.');
                                      await fetchRegistrations();
                                    }
                                    setTimeout(() => {
                                      setSuccessMsg('');
                                      setErrorMsg('');
                                    }, 2000);
                                  }}
                                >
                                  ✓ Elfogadás
                                </button>
                                <button
                                  className="bg-orange-500/90 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50"
                                  onClick={async () => {
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                    const res = await fetch(`/api/registrations/${reg.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ status: 'rejected' }),
                                    });
                                    const body = await res.json().catch(() => ({}));
                                    if (!res.ok) {
                                      setErrorMsg(
                                        String(body?.error || 'Hiba a státusz állításnál'),
                                      );
                                    } else {
                                      setSuccessMsg('Elutasítva. Email elküldve.');
                                      await fetchRegistrations();
                                    }
                                    setTimeout(() => {
                                      setSuccessMsg('');
                                      setErrorMsg('');
                                    }, 2000);
                                  }}
                                >
                                  ✕ Elutasítás
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-white/60 text-lg mb-6">Nincs nevezés ehhez a versenyhez.</p>
            </div>
          )}
        </div>
      </div>

      {/* Hozzáadás modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative card p-8 w-full max-w-lg z-10 border-2 border-[#e4eb34]/30">
            <button
              className="absolute top-4 right-4 text-2xl text-white/60 hover:text-[#e4eb34] transition-colors"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold gradient-text mb-2">Új nevező hozzáadása</h3>
            <p className="text-white/60 text-sm mb-6">
              {selectedRaceName && `Verseny: ${selectedRaceName}`}
              {selectedCategory && ` - Kategória: ${selectedCategory}`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input"
                placeholder="Név"
                value={addForm.name}
                onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Email"
                type="email"
                value={addForm.email}
                onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Telefon"
                value={addForm.phone}
                onChange={(e) => setAddForm((f) => ({ ...f, phone: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Súly"
                type="number"
                min={30}
                max={200}
                value={addForm.weight}
                onChange={(e) => setAddForm((f) => ({ ...f, weight: e.target.value }))}
              />
              {availableCategories.length > 0 && (
                <select
                  className="input md:col-span-2"
                  value={addForm.category}
                  onChange={(e) => setAddForm((f) => ({ ...f, category: e.target.value }))}
                >
                  <option value="">Válassz kategóriát</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
              {addForm.category === 'Endurance' && (
                <select
                  className="input md:col-span-2"
                  value={addForm.team_size}
                  onChange={(e) => setAddForm((f) => ({ ...f, team_size: e.target.value }))}
                >
                  <option value="">Hány fős a csapat?</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} fő
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="btn btn-outline px-6" onClick={() => setShowAddModal(false)}>
                Mégse
              </button>
              <button
                className="btn btn-primary px-6"
                disabled={
                  adding ||
                  !selectedRaceName ||
                  !addForm.name ||
                  !addForm.email ||
                  !addForm.phone ||
                  !addForm.weight ||
                  (availableCategories.length > 0 && !addForm.category) ||
                  (addForm.category === 'Endurance' && !addForm.team_size)
                }
                onClick={async () => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setAdding(true);
                  try {
                    const res = await fetch('/api/registrations', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: addForm.name,
                        email: addForm.email,
                        phone: addForm.phone,
                        weight: Number(addForm.weight),
                        race_name: selectedRaceName,
                        category: addForm.category || selectedCategory,
                        team_size:
                          addForm.category === 'Endurance' && addForm.team_size
                            ? Number(addForm.team_size)
                            : undefined,
                      }),
                    });
                    const body = await res.json().catch(() => ({}));
                    if (!res.ok) throw new Error(body?.error || 'Hiba a mentésnél');
                    setSuccessMsg('Nevező hozzáadva.');
                    setAddForm({
                      name: '',
                      email: '',
                      phone: '',
                      weight: '',
                      category: '',
                      team_size: '',
                    });
                    setShowAddModal(false);
                    await fetchRegistrations();
                  } catch (e: unknown) {
                    const message = e instanceof Error ? e.message : String(e);
                    setErrorMsg(message || 'Ismeretlen hiba');
                  } finally {
                    setAdding(false);
                    setTimeout(() => {
                      setSuccessMsg('');
                      setErrorMsg('');
                    }, 2000);
                  }
                }}
              >
                {adding ? '⏳ Mentés...' : '✓ Mentés'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
