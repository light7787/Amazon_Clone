import React, { useEffect,useState } from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Store";
import { useNavigate } from "react-router-dom";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Header() {
  const navigate = useNavigate();
  
 
 
  const { UserData } = useAuth();
  const {productcount} = useAuth();
  const auth = localStorage.getItem('user');
  const user = auth ? JSON.parse(auth) :null;
  
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }




  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`https://amazon-clone-back.vercel.app/search/${key}`);
      result = await result.json();
      if (result) {
        UserData(result);
      } else {
        
      }
    }
    else{
      UserData('');
    }
  }
  const GotoSearch = ()=>{
    navigate('/searchpage');
  }

  return (
    <div className="sticky top-0 h-[60px] flex align-middle bg-[#000000]  z-50">
      <NavLink to="/">
        <div className="flex items-center">
        <img
          className="mb-3"
        src="/logo.jpg"
          alt="Amazon Logo" width={60} height={80}
        />
        
      
      <p className="text-white mb-3 font-bold text-2xl">Gadget Store</p></div>
      </NavLink>
      <div className=" flex-1 align-middle">
        <div className="search flex p-[20px] justify-end items-center ">
          <input
            type="text"
            className="header__searchInput  p-[10px] border-0 h-8 w-[500px] rounded-md"
            onChange={searchHandle} // Fixed onChange event handler 
            placeholder="Search for mobiles or laptops"
          />
          <SearchIcon className="header__searchIcon p-[5px] ml-2 h-[25px] bg-white rounded-full" onClick={GotoSearch} /> 
        </div>
      </div>
      <div className="header__nav flex justify-evenly p-[18px]">
        <div>
          {!auth ? (
            <NavLink to={'/login'}>
              <div className="header__option flex flex-col ml-[10px] mr-[10px]  text-white">
                <span className="header__optionLineOne text-[10px]">Hello Guest</span>
                <span className="header__optionLineTwo text-[13px] font-extrabold">Sign In</span>
              </div>
            </NavLink>
          ) : (
            <NavLink to='/accounts'>
           
              <div className="flex">
                <img className="header__option flex flex-col mt-1 ml-[10px] mr-[10px] h-[25px] w-[25px] rounded" src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" />
                <div className="header__option flex flex-col ml-[10px] mr-[10px]  text-white">
                  <span className="header__optionLineOne text-[10px]">Hello {user.name}</span>
                  <span className="header__optionLineTwo text-[13px] font-extrabold">Account&Lists</span>
                </div>
              </div></NavLink>
            
          )}
        </div>
        <div className="header__option flex flex-col ml-[10px] mr-[5px] text-white">
          <span className="header__optionLineOne text-[10px]">Returns</span>
          <span className="header__optionLineTwo  text-[13px] font-extrabold">& Orders</span>
        </div>
        {!auth ? <div></div> : (
           <NavLink onClick={logout} to='/'>
           <div className="header__option flex flex-col ml-[10px] mr-[10px] mt-[-8px] text-white">
             {/* <span className="header__optionLineOne text-[10px]">LogOut</span> */}
             <ExitToAppIcon></ExitToAppIcon>
             <span className="header__optionLineTwo  text-[13px] font-extrabold">LogOut</span>
           </div>
           </NavLink>
        )}
       
      <NavLink to='/basket'>
          <div className="header__optionBasket flex align-middle text-white">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount ml-[10px] mr-[10px]">
            {productcount}
            </span>
          </div>
          </NavLink>
       
      </div>
    </div>
  );
}

export default Header;
