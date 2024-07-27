import React, { useState, useEffect } from 'react';
import Sidebar from '../../../partials/Sidebar';
import DropdownProfile from '../../DropdownProfile';
import { jwtDecode } from 'jwt-decode';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    user_level: 'USER',
  });
  const [userRole, setUserRole] = useState('');

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
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
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
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="max-xs:sr-only">Add User</span>
      </button>
    )}

    <div className="flex flex-col flex-grow p-3 overflow-hidden">
      <div className="table-container overflow-auto max-h-[calc(100vh-120px)]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">ID</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">Username</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">Email</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">Password</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">User Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.password}</td>
                <td className="py-2 px-4 border-b">{user.user_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl mb-4">Add New User</h2>
          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">User Level</label>
              <select
                name="user_level"
                value={newUser.user_level}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="OWNER">OWNER</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default UsersTable;
