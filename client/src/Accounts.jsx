import React from 'react'
import Header from './Header'
import LockIcon from '@mui/icons-material/Lock';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { NavLink } from 'react-router-dom';
const Accounts = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  return (
    <div>
  <Header></Header>
  <div className='flex flex-wrap gap-3 w-[500px] m-auto mt-10'>
    <NavLink to={"/userupdate/"+user._id}>
  <div className='h-[100px] w-[200px] border border-gray-500 cursor-pointer rounded flex bg-gray-200 hover:bg-gray-300  transition-colors duration-300 ease-in-out ' >
  <div className='mt-3 ml-3'><LockIcon></LockIcon></div> 
  <div className=' flex flex-col mt-4  ' >
    <div className='font-bold'>Login & Security</div>
    <div className='text-[15px]'>Edit name,password & email</div>
  </div>
  </div></NavLink>
  <div className='h-[100px] w-[200px] border border-gray-500 cursor-pointer rounded flex  bg-gray-200 hover:bg-gray-300  transition-colors duration-300 ease-in-out ' >
  <div className='mt-3 ml-3'><EditLocationIcon></EditLocationIcon></div>
  <NavLink to='/address'>
  <div className=' flex flex-col mt-4  ' >
   
    <div className='font-bold' >Your Adress</div>
    <div className='text-[15px]'>Edit adress for orders & gifts</div>
  </div></NavLink>
  </div>
  <div className='h-[100px] w-[200px] border border-gray-500 cursor-pointer rounded flex  bg-gray-200 hover:bg-gray-300  transition-colors duration-300 ease-in-out ' >
  <div className='mt-3 ml-3'><FolderSpecialIcon></FolderSpecialIcon></div>
  <div className=' flex flex-col mt-4  ' >
    <div className='font-bold'>Your Orders</div>
    <div className='text-[15px]'>Track,return,buythings again</div>
  </div>
  </div>
  <div className='h-[100px] w-[200px] border border-gray-500 cursor-pointer rounded flex  justify-center items-center  bg-gray-200 hover:bg-gray-300  transition-colors duration-300 ease-in-out' >
  <div className=''><ContactSupportIcon></ContactSupportIcon></div>
  <div className='   ' >
    <div className='font-bold'>Contact Us</div>

  </div>
  </div>
  </div>
  </div>
  )
}

export default Accounts