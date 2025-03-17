import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  getAllUsers,
  createAdminUser,
  updateUser,
  deleteUser,
} from '../services/user.service';

export default function UsersPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function fetchUsers() {
    if (!token) return;
    try {
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [token]);

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingUser) {
        await updateUser(editingUser.id, { email, name, password }, token);
        setEditingUser(null);
      } else {
        const newUser = await createAdminUser({ email, name, password }, token);
        setUsers((prev) => [...prev, newUser]);
      }
      fetchUsers();
      setEmail('');
      setName('');
      setPassword('');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  function handleEdit(user: any) {
    setEditingUser(user);
    setEmail(user.email);
    setName(user.name);
    setPassword('');
  }

  return (
    <div>
      <h2>User Management</h2>

      <button onClick={() => navigate(-1)}>⟵ Go Back</button>

      <form onSubmit={handleCreateOrUpdate}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!editingUser} // Password required only for new users
        />
        <button type="submit">{editingUser ? 'Update' : 'Create'} User</button>
        {editingUser && (
          <button type="button" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} - {u.name}
            <button onClick={() => handleEdit(u)}>✏️ Edit</button>
            <button onClick={() => handleDelete(u.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
