import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Addaddress = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const username = user.name;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState('');
  const [defaults,setDefaults] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = () => {
    setDefaults(!defaults); // Toggle the value between true and false
  };

  const AddProduct = async () => {
    // if (!name || !price || !category || !img || !rating) {
    //   setError(true);
    //   return false;
    // }


    let result = await fetch("https://amazon-clone-back.vercel.app/add-address", {
      method: "post",
      body: JSON.stringify({ username,name,mobile,pin,location,area,city,state,defaults }),
      headers: {
        "Content-Type": "application/json",
        authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
  
    setName("");
    setMobile("");
    setPin("");
    setLocation("");
    setArea("");
    setCity("");
    setState("");
    setDefaults(false);
    navigate("/address");
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mb-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold">Add Address</h1>
        <p>Hello, {user.name}</p>
      </div>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter Name"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* {error && !name && <p className="text-red-500 mb-4">Enter a valid name</p>} */}
        <input
          type="number"
          placeholder="Enter Mobile Number"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {/* {error && !price && <p className="text-red-500 mb-4">Enter a valid price</p>} */}
        <input
          type="number"
          placeholder="Enter Pincode"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        {/* {error && !category && <p className="text-red-500 mb-4">Enter a valid category</p>} */}
        <input
          type="text"
          placeholder="Enter location"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* {error && !img && <p className="text-red-500 mb-4">Enter a valid image link</p> */}
        <input
          type="text"
          placeholder="Enter landmark/Area"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter City"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* {error && !rating && <p className="text-red-500 mb-4">Enter a valid rating</p>} */}
        <input
          type="text"
          placeholder="Enter State"
          className="block w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        {/* {error && !rating && <p className="text-red-500 mb-4">Enter a valid rating</p>} */}
        <label>
        <input
          type="checkbox"
          checked={defaults}
          onChange={handleChange}
        />
        Set default
      </label>

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

export default Addaddress;
