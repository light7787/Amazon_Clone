import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(false);
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await fetch(`https://amazon-clone-back.vercel.app/product/${params.id}`);
      const result = await response.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setImg(result.img);
      setRating(result.rating);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const AddProduct = async () => {
    if (!name || !price || !category || !img || !rating) {
      setError(true);
      return false;
    }

    try {
      const response = await fetch(`https://amazon-clone-back.vercel.app/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, category, img, rating }),
        headers: {
          "Content-Type": "application/json",
          "authentication": `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mb-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold">Update Product</h1>
        <p>Hello, {user.name}</p>
      </div>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Product Name"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <p className="text-red-500 mb-4">Enter a valid name</p>}
        <input
          type="text"
          placeholder="Product Price"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <p className="text-red-500 mb-4">Enter a valid price</p>}
        <input
          type="text"
          placeholder="Product Category"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <p className="text-red-500 mb-4">Enter a valid category</p>}
        <input
          type="text"
          placeholder="Image Link"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {error && !img && <p className="text-red-500 mb-4">Enter a valid image link</p>}
        <input
          type="text"
          placeholder="Rating"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        {error && !rating && <p className="text-red-500 mb-4">Enter a valid rating</p>}
        <button
          className="block w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          onClick={AddProduct}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
