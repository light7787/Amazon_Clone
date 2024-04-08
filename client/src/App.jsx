import React from 'react'
import "./App.css";
import {Routes, Route} from "react-router-dom";
import Chinu from './Chinu';
import Login from './Login';
import Signin from './SignIn';
import LoginAdmin from './LoginAdmin';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import UpdateProduct from './Update';
import Basket from './Basket';
import User from './User';
import Accounts from './Accounts';
import AccountUpdate from './AccountUpdate';

// import PrivateComponent from './privateComponent';



function App() {
  return (
    <div className="app">
      
       <Routes>
        
        <Route path='/' element={<Chinu/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/adminlogin' element={<LoginAdmin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/basket' element={<Basket/>}/>
        <Route path='/userlist' element={<User/>}/>
        <Route path='/accounts' element={<Accounts/>}/>
        <Route path='/userupdate/:id' element={<AccountUpdate/>}/>

       
        

        
        </Routes> 
      </div>
  )
}

export default App