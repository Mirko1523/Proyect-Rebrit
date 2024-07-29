import React, { useState, useEffect } from 'react';
import Sidebar from '../../../partials/Sidebar';
import DropdownProfile from '../../DropdownProfile';
import {jwtDecode} from 'jwt-decode';

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
  const [editingUserId, setEditingUserId] = useState(null);

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
      setUsers(users.map(user => (user.id === editingUserId ? data : user)));
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
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    } catch (error) {
      console.log('Error disabling/enabling user:', error);
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
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s.4-1 1-1z" />
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
                  <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">Status</th>
                  <th className="py-2 px-4 border-b bg-gray-200 text-gray-800">Actions</th>
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
                    <td className="py-2 px-4 border-b">{user.is_disabled ? 'Disabled' : 'Active'}</td>
                    <td className="py-2 px-4 border-b">
                      {(userRole === 'OWNER' || userRole === 'ADMIN') && (
                        <>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDisableUser(user.id)}
                            className={`btn ${user.is_disabled ? 'bg-green-500' : 'bg-red-500'} text-white hover:bg-${user.is_disabled ? 'green' : 'red'}-400 dark:hover:bg-${user.is_disabled ? 'green' : 'red'}-300`}
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
        
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">{editingUserId ? 'Edit User' : 'Add User'}</p>
                  <button
                    className="modal-close cursor-pointer z-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 3.47a.75.75 0 00-1.06 0L9 7.94 4.53 3.47a.75.75 0 00-1.06 1.06L7.94 9l-4.47 4.47a.75.75 0 101.06 1.06L9 10.06l4.47 4.47a.75.75 0 101.06-1.06L10.06 9l4.47-4.47a.75.75 0 000-1.06z" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={editingUserId ? handleUpdateUser : handleAddUser}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_level">
                      User Level
                    </label>
                    <select
                      id="user_level"
                      name="user_level"
                      value={newUser.user_level}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="OWNER">OWNER</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                    >
                      {editingUserId ? 'Update User' : 'Add User'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn bg-red-500 text-white hover:bg-red-400 dark:hover:bg-red-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
