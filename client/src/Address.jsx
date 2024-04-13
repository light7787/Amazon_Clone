import React, { useEffect, useState } from 'react';
import Header from './Header';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

const Address = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    const username = user.name;
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            let response = await fetch(`https://amazon-clone-back.vercel.app/address/${username}`);
            let data = await response.json();
            setAddresses(data);
           
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };
    console.log(addresses);

    return (
        <div>
            <Header />
            <div className="mt-10 ml-10">
                <div className='text-lg'>Your Account › Your Addresses</div>
                <div className='text-3xl'>Your Address</div>
                <NavLink to="/add-address">
                    <div className='w-1/4 h-[300px] border-dashed border-2 border-black mt-4 flex flex-col pt-[50px] pl-[70px] rounded-xl'>
                        <img className='h-[125px] w-[125px] ml-5 opacity-15' src="https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-Vector-PNG-Picture.png" alt="" />
                        <div className='font-bold text-3xl'>Add address</div>
                    </div>
                </NavLink>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {addresses.map((address, index) => (
                            <div key={index} className="bg-white border rounded-lg p-4">
                                <p className="text-lg font-semibold">{address.name}</p>
                                <p>{address.mobile}</p>
                                <p>{address.location}, {address.area}</p>
                                <p>{address.city}, {address.state} - {address.pin}</p>
                                <p>{address.defaults ? "Default Address" : ""}</p>
                            </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Address;
