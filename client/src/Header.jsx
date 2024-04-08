import React, { useEffect,useState } from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Store";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Header() {
 
 
  const { UserData } = useAuth();
  const {productcount} = useAuth();
  const auth = localStorage.getItem('user');
  const user = auth ? JSON.parse(auth) :null;
  
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }




  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
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

  return (
    <div className="header h-[60px] flex align-middle bg-[#131921] sticky top-0 z-100">
      <NavLink to="/">
        <img
          className="header__logo w-[100px] object-contain mt-[18px] ml-[20px] mr-[20px] mb-0"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </NavLink>
      <div className="header__search flex-1 align-middle">
        <div className="search flex p-[20px]">
          <input
            type="text"
            className="header__searchInput h-[23px] p-[10px] border-0 w-full"
            onChange={searchHandle} // Fixed onChange event handler
          />
          <SearchIcon className="header__searchIcon p-[5px] h-[22px] bg-[#cd9042]" /> 
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
