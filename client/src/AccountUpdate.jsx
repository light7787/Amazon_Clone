import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const AccountUpdate = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const params = useParams();
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);

    const getUserDetails = async () => {
        try {
            let result = await fetch(`https://amazon-clone-back.vercel.app/userupdate/${params.id}`);
            result = await result.json();
            setUserDetails(result);
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    const AddProduct = async () => {
        if (!name || !email || !password) {
            setError(true);
            return false;
        }

        try {
            const response = await fetch(`https://amazon-clone-back.vercel.app/userupdate/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setShow(false);
            getUserDetails(); // Fetch updated user details
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        if (userDetails) {
            localStorage.setItem('user', JSON.stringify(userDetails)); // Set local storage after userDetails is updated
        }
    }, [userDetails]);

    const searchbutton = () => {
        setShow(true);
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
            {!show && <div className='ml-[380px]' onClick={searchbutton}><EditIcon /></div>}
            <h2 className="text-xl font-bold mb-4">Account Update</h2>
            {show ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        {error && !name && <span className="ml-[180px] text-red-500 inline-block">Enter a valid name</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        {error && !email && <span className="ml-[180px] text-red-500 inline-block">Enter a valid email</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        {error && !password && <span className="ml-[180px] text-red-500 inline-block">Enter a valid password</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button className='mb-4' onClick={AddProduct}>Submit</button>
                </div>
            ) : (
                userDetails && (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <div>{userDetails.name}</div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <div>{userDetails.email}</div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                            <div>{userDetails.password}</div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default AccountUpdate;
