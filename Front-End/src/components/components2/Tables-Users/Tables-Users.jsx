import React, { useState, useEffect } from 'react';
import Sidebar from '../../../partials/Sidebar';
import DropdownProfile from '../../DropdownProfile';
import {jwtDecode} from 'jwt-decode';
import FilterTable from './filters';
import Search from './searchbar';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    user_level: 'USER',
  });
  const [userRole, setUserRole] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [filters, setFilters] = useState({
    OWNER: false,
    ADMIN: false,
    USER: false,
  });
  const [searchQuery,setSearchQuery] = useState('')


  useEffect(() => {
    const fetchUserRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserRole(decodedToken.user_level || '');
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    fetchUserRole();

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const data = await response.json();
      setUsers([...users, data]);
      setFilteredUsers([...users, data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      const updatedUsers = users.map(user => (user.id === editingUserId ? data : user));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsModalOpen(false);
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDisableUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/disable`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      const updatedUsers = users.map(user => (user.id === userId ? updatedUser : user));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.log('Error disabling/enabling user:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const activeFilters = Object.keys(newFilters).filter((key) => newFilters[key]);
    if (activeFilters.length === 0) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        activeFilters.includes(user.user_level)
      );
      setFilteredUsers(filtered);
    }
  };

 const handleSearch = (email) => {
    setSearchQuery(email);
    const result = users.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    setFilteredUsers(result);
  };


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <div className="flex justify-center items-center p-3">
          <DropdownProfile />
        </div>
        <hr />
        <br />
        {userRole === 'OWNER' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
          >
            <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s.4-1 1-1z" />
            </svg>
            <span className="max-xs:sr-only">Agregar usuario</span>
          </button>
        )}
        <br></br>
          <div className='flex justify-center items-center space-x-4 p-3'>         
          <Search onSearch={handleSearch} />
        <FilterTable  onFilterChange={handleFilterChange} />
        </div>
      

        <div className="flex flex-col flex-grow p-3 overflow-hidden">
          <div className="table-container overflow-auto max-h-[calc(100vh-120px)]">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">ID</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Usuario</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Email</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Contraseña</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Nivel</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Status</th>
                  <th className="py-2 px-2 border-b bg-gray-200 text-gray-800 text-xs">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-2 border-b text-xs">{user.id}</td>
                    <td className="py-2 px-2 border-b text-xs">{user.username}</td>
                    <td className="py-2 px-2 border-b text-xs">{user.email}</td>
                    <td className="py-2 px-2 border-b text-xs">{user.password}</td>
                    <td className="py-2 px-2 border-b text-xs">{user.user_level}</td>
                    <td className="py-2 px-2 border-b text-xs">{user.is_disabled ? 'Disabled' : 'Active'}</td>
                    <td className="py-2 px-2 border-b text-xs">
                      {(userRole === 'OWNER' || userRole === 'ADMIN') && (
                        <>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="btn bg-gray-500 text-white hover:bg-gray-400 mr-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDisableUser(user.id)}
                            className={`btn ${user.is_disabled ? 'bg-green-500' : 'bg-red-500'} text-white hover:bg-opacity-80`}
                          >
                            {user.is_disabled ? 'Enable' : 'Disable'}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">{editingUserId ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            <form onSubmit={editingUserId ? handleUpdateUser : handleAddUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nombre de Usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nivel de Usuario:</label>
                <select
                  name="user_level"
                  value={newUser.user_level}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                >
                  <option value="OWNER">Owner</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn bg-gray-300 text-gray-800 hover:bg-gray-200 mr-2"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-5">
                  {editingUserId ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
