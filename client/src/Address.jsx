import React from 'react'
import Header from './Header'
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

const Address = () => {
  return (
    <div>
        <Header/>
        <div className=" mt-10 ml-10">
        <div className='text-lg'>Your Account›Your Addresses</div>
        <div className='text-3xl'>Your Address</div>
        <NavLink to="/add-address">
        <div className='w-1/4 h-[300px] border-dashed border-2 border-black mt-4 flex flex-col pt-[50px] pl-[80px] rounded-xl  '>
          <img className='h-[125px] w-[125px] ml-5 opacity-15' src="https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-Vector-PNG-Picture.png" alt="" />
          <div className='font-bold text-3xl'>Add address</div></div></NavLink>
          </div>
    </div>
  )
}

export default Address