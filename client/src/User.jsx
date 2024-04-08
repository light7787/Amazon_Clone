import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './User.css'
const User = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      let response = await fetch("http://localhost:5000/users");
      let result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 mb-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p>Hello, {user.name}!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <NavLink to='/userlist'>
          <button className="btn-blue">
            User List
          </button>
        </NavLink>
        <NavLink to='/dashboard'>
          <button className="btn-green">
            Products
          </button>
        </NavLink>
        <NavLink to='/addproduct'>
          <button className="btn-red">
            Add Product
          </button>
        </NavLink>
        <NavLink to='/'>
          <button className="btn-violet">
            Go Home
          </button>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-2">Email: {user.email}</p>
            <p className="text-gray-600 mb-2">Password: {user.password}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
