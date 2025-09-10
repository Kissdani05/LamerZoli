'use client';
import { useState, useEffect } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabaseClient';

type RegistrationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  weight: number | string;
  race_id: string;
  race_name: string;
  status?: 'pending' | 'accepted' | 'rejected' | string;
};

export default function NevezesekAdmin() {
  const [raceNames, setRaceNames] = useState<string[]>([]);
  const [selectedRaceName, setSelectedRaceName] = useState<string>('');
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [editing, setEditing] = useState<{ id: string; field: keyof RegistrationRow } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '', weight: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (id: string, field: keyof RegistrationRow, value: string) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('id, name, email, phone, weight, race_id, race_name, status')
      .order('id', { ascending: false });
    if (error) {
      setRegistrations([]);
      setErrorMsg('Lekérdezési hiba: ' + error.message);
    } else {
      const rows = (data || []) as RegistrationRow[];
      setRegistrations(rows);
      const unique = Array.from(
        new Set(
          rows
            .map((r) => (r.race_name ? String(r.race_name).trim() : ''))
            .filter((s) => s && s.length > 0),
        ),
      ).sort((a, b) => a.localeCompare(b));
      setRaceNames(unique);
      // Auto-select first race if none selected or selection no longer exists
      if (unique.length > 0) {
        setSelectedRaceName((prev) => (unique.includes(prev) ? prev : unique[0]));
      } else {
        setSelectedRaceName('');
      }
    }
  };

  const handleEditSave = async () => {
    if (!editing) return;
    setLoadingEdit(true);
    setErrorMsg('');
    setSuccessMsg('');
    const { id, field } = editing;
    const { error } = await supabase
      .from('registrations')
      .update({ [field]: editValue })
      .eq('id', id);
    if (!error) {
      setSuccessMsg('Sikeres szerkesztés!');
      await fetchRegistrations();
    } else {
      setErrorMsg('Szerkesztés sikertelen! ' + error.message);
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
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (!error) {
      setSuccessMsg('Sikeres törlés!');
      await fetchRegistrations();
    } else {
      setErrorMsg('Törlés sikertelen! ' + error.message);
    }
    setLoadingDelete(null);
    setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 2000);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nevezések Admin</h1>
      <div className="flex items-center gap-2 mb-6">
        <select
          className="input"
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
        <button
          className="btn btn-outline"
          onClick={() => {
            // Export current filtered rows (selected race) to CSV
            const filtered = registrations.filter((r) =>
              selectedRaceName ? r.race_name === selectedRaceName : true,
            );
            const headers = [
              'ID',
              'Név',
              'Email',
              'Telefon',
              'Súly',
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
              r.race_id ?? '',
              r.race_name ?? '',
              r.status ?? 'pending',
            ]);
            const csv = [headers, ...rows].map((line) => line.map(toCell).join(',')).join('\n');
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
          CSV letöltése
        </button>
      </div>

      {/* Táblázat */}
      <h2 className="text-xl font-bold mb-2">Nevezések</h2>
      {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {registrations.filter((r) => (selectedRaceName ? r.race_name === selectedRaceName : true))
        .length > 0 ? (
        <table className="w-full border mb-8">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border text-white">Név</th>
              <th className="p-2 border text-white">Email</th>
              <th className="p-2 border text-white">Telefon</th>
              <th className="p-2 border text-white">Súly</th>
              <th className="p-2 border text-white">Státusz</th>
              <th className="p-2 border text-white">Művelet</th>
            </tr>
          </thead>
          <tbody>
            {registrations
              .filter((r) => (selectedRaceName ? r.race_name === selectedRaceName : true))
              .map((reg) => (
                <tr key={reg.id}>
                  <td className="p-2 border">
                    {editing && editing.id === reg.id && editing.field === 'name' ? (
                      <>
                        <input
                          className="border rounded px-2 py-1 text-sm"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1"
                          onClick={handleEditSave}
                          disabled={loadingEdit}
                        >
                          Mentés
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          onClick={handleEditCancel}
                          disabled={loadingEdit}
                        >
                          Mégse
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{reg.name}</span>
                        <button
                          className="ml-1"
                          onClick={() => handleEditClick(reg.id, 'name', String(reg.name))}
                          title="Szerkesztés"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </button>
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {editing && editing.id === reg.id && editing.field === 'email' ? (
                      <>
                        <input
                          className="border rounded px-2 py-1 text-sm"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1"
                          onClick={handleEditSave}
                          disabled={loadingEdit}
                        >
                          Mentés
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          onClick={handleEditCancel}
                          disabled={loadingEdit}
                        >
                          Mégse
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{reg.email}</span>
                        <button
                          className="ml-1"
                          onClick={() => handleEditClick(reg.id, 'email', String(reg.email))}
                          title="Szerkesztés"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </button>
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {editing && editing.id === reg.id && editing.field === 'phone' ? (
                      <>
                        <input
                          className="border rounded px-2 py-1 text-sm"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1"
                          onClick={handleEditSave}
                          disabled={loadingEdit}
                        >
                          Mentés
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          onClick={handleEditCancel}
                          disabled={loadingEdit}
                        >
                          Mégse
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{reg.phone}</span>
                        <button
                          className="ml-1"
                          onClick={() => handleEditClick(reg.id, 'phone', String(reg.phone))}
                          title="Szerkesztés"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </button>
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {editing && editing.id === reg.id && editing.field === 'weight' ? (
                      <>
                        <input
                          className="border rounded px-2 py-1 text-sm"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1"
                          onClick={handleEditSave}
                          disabled={loadingEdit}
                        >
                          Mentés
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          onClick={handleEditCancel}
                          disabled={loadingEdit}
                        >
                          Mégse
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{reg.weight}</span>
                        <button
                          className="ml-1"
                          onClick={() => handleEditClick(reg.id, 'weight', String(reg.weight))}
                          title="Szerkesztés"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </button>
                      </>
                    )}
                  </td>
                  <td className="p-2 border text-center">{reg.status || 'pending'}</td>
                  <td className="p-2 border text-center flex gap-2 justify-center flex-wrap">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      onClick={() => handleDelete(reg.id)}
                      disabled={loadingDelete === reg.id}
                    >
                      {loadingDelete === reg.id ? 'Törlés...' : 'Törlés'}
                    </button>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
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
                          setErrorMsg(String(body?.error || 'Hiba a státusz állításnál'));
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
                      Elfogadás
                    </button>
                    <button
                      className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 disabled:opacity-50"
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
                          setErrorMsg(String(body?.error || 'Hiba a státusz állításnál'));
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
                      Elutasítás
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="p-3 text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddModal(true)}
                  disabled={!selectedRaceName}
                  title={selectedRaceName ? '' : 'Válassz versenyt'}
                >
                  Hozzáadás
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted">Nincs nevezés.</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            disabled={!selectedRaceName}
            title={selectedRaceName ? '' : 'Válassz versenyt'}
          >
            Hozzáadás
          </button>
        </div>
      )}

      {/* Hozzáadás modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-black text-white rounded-2xl shadow-2xl p-6 w-full max-w-lg z-10 border border-white/10">
            <div className="text-xl font-bold mb-4">
              Új nevező {selectedRaceName && `– ${selectedRaceName}`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                Mégse
              </button>
              <button
                className="btn btn-primary"
                disabled={
                  adding ||
                  !selectedRaceName ||
                  !addForm.name ||
                  !addForm.email ||
                  !addForm.phone ||
                  !addForm.weight
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
                      }),
                    });
                    const body = await res.json().catch(() => ({}));
                    if (!res.ok) throw new Error(body?.error || 'Hiba a mentésnél');
                    setSuccessMsg('Nevező hozzáadva.');
                    setAddForm({ name: '', email: '', phone: '', weight: '' });
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
                {adding ? 'Mentés...' : 'Mentés'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
