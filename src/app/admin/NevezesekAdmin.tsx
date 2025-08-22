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
};
type RaceOption = { id: string; name: string };

export default function NevezesekAdmin() {
  const [races, setRaces] = useState<RaceOption[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [editing, setEditing] = useState<{ id: string; field: keyof RegistrationRow } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleEditClick = (id: string, field: keyof RegistrationRow, value: string) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  const fetchRegistrations = async (raceId: string) => {
    const { error } = await supabase
      .from('registrations')
      .select('id, name, email, phone, weight, race_id, race_name')
      .eq('race_id', raceId);
    if (error) {
      setRegistrations([]);
      setErrorMsg('Lekérdezési hiba: ' + error.message);
    } else {
      // ...existing code...
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
      if (selectedRaceId) await fetchRegistrations(selectedRaceId);
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
      if (selectedRaceId) await fetchRegistrations(selectedRaceId);
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
    if (selectedRaceId) {
      fetchRegistrations(selectedRaceId);
    } else {
      setRegistrations([]);
    }
  }, [selectedRaceId]);

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nevezések Admin</h1>
      <label className="font-semibold mb-2 block" htmlFor="race-select">
        Verseny kiválasztása:
      </label>
      <select
        id="race-select"
        value={selectedRaceId}
        onChange={(e) => setSelectedRaceId(e.target.value)}
        className="input mb-6"
      >
        <option value="">-- Válassz versenyt --</option>
        {races.map((race) => (
          <option key={race.id} value={race.id}>
            {race.name}
          </option>
        ))}
      </select>
      <h2 className="text-xl font-bold mb-2">Nevezések</h2>
      {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {selectedRaceId && registrations.length > 0 ? (
        <table className="w-full border mb-8">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border text-white">Név</th>
              <th className="p-2 border text-white">Email</th>
              <th className="p-2 border text-white">Telefon</th>
              <th className="p-2 border text-white">Súly</th>
              <th className="p-2 border text-white">Művelet</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
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
                <td className="p-2 border text-center flex gap-2 justify-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleDelete(reg.id)}
                    disabled={loadingDelete === reg.id}
                  >
                    {loadingDelete === reg.id ? 'Törlés...' : 'Törlés'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Nincs nevezés ehhez a versenyhez.</p>
      )}
    </div>
  );
}
