import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await fetch("https://amazon-clone-back.vercel.app/product");
      let result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let response = await fetch(`https://amazon-clone-back.vercel.app/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let result = await response.json();
      if (result) {
        alert("Item deleted");
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mb-12 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <NavLink to="/userlist">
          <button className="btn-blue">User Management</button>
        </NavLink>
        <NavLink to='/'>
          <button className="btn-violet">Go Home</button>
        </NavLink>
        <NavLink to="/addproduct">
          <button className="btn-red">Add Product</button>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-4">Rating: {parseInt(product.rating)}</p>
            <img
              className="w-full h-48 object-cover rounded-lg mb-4"
              src={product.img}
              alt={product.name}
            />
            <div className="flex justify-end">
              <div
                className="cursor-pointer mr-4"
                onClick={() => deleteProduct(product._id)}
              >
                <DeleteIcon className="text-red-500" />
              </div>
              <NavLink to={"/update/" + product._id}>
                <EditNoteIcon className="text-blue-500" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
