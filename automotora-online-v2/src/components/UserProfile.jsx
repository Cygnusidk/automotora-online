import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId, onSave }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Fallo de red');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setName(data.name);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    fetch(`/api/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        setSaving(false);
        if (onSave) onSave({ name });
      })
      .catch((err) => {
        setSaving(false);
      });
  };

  if (!userId) return <div>No se ha proporcionado un usuario</div>;
  if (loading) return <div role="progressbar" aria-label="cargando">Cargando...</div>;
  if (error) return <div>Error al cargar los datos del usuario</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Nombre</label>
        <input
          id="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={saving}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
