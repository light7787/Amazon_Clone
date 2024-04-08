import { ClassTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import { NavLink,Navigate,useNavigate} from 'react-router-dom';

// import {createUserWithEmailAndPassword} from "firebase/auth";
// import {signInWithEmailAndPassword} from "firebase/auth";

function Signin() {
  const navigate=useNavigate();
 
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [notify,setNotify] = useState('');
//   const signIn =async() =>{
//     try{
//       const userCredential = await signInWithEmailAndPassword(auth,email,password)
//       navigate('/')
//       setNotify("Congrats")
//     }catch(err){
//       console.log(err)
//     }

//   }

//   const register = async() =>{
//     try{
//       const userCredential = await createUserWithEmailAndPassword(auth,email,password)
      
//     }catch(err){
//       console.log(err);
//     }
//   }
const collectData = async(e)=>{
  e.preventDefault();
  let admin= false;
  console.warn(name,email,password);
  let result = await fetch('http://localhost:5000/register',{

  method:'post',
  body: JSON.stringify({name,email,password,admin}),
  headers:{
    'Content-Type':'application/json'
  }
  });
  result =await result.json()
  console.warn(result);
  localStorage.setItem("user",JSON.stringify(result.result));
  localStorage.setItem("token",JSON.stringify(result.auth));

  navigate('/')
 
}


 
  return (
    <div className="login h-[100vh] flex flex-col">
      <NavLink to="/">
        <img className="login__logo mt-[20px] mb-[20px] object-contain w-[100px] mr-auto ml-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
      </NavLink>
      <div className="login__container w-[300px] h-fit flex flex-col rounded-md border-solid border-black border-[1px] p-[20px] ml-auto mr-auto ">
        <h1 className="header font-bold mb-[20px]">Sign-up</h1>
        <form onSubmit={collectData}>
        <h5 className="mail mb-[20px]">Name</h5>
          <input type="text" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]" value={name} onChange={(e)=>setName(e.target.value)} />
          <h5 className="mail mb-[20px]">E-mail</h5>
          <input type="text" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <h5 className="pass mb-[20px]">Password</h5>
          <input type="password" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]"value={password} onChange={(e)=>setPassword(e.target.value)} />
          <h5 className="pass mb-[20px]">Confirm Password</h5>
          <input type="password" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]" />
          <button className="login__signButton bg-[#f0c14b]  rounded-sm w-full h-[30px] border-solid border-[1px] mt-[10px] border-t-[#a88734] border-r-[#9c7e31] border-b-[#846a29]" >
            
            Sign up
          </button>
        
        </form>
        <p className="mt-[15px] text-sm">
          By signing-in you agree to the Sasta Amazon Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
        </p>
        <NavLink to="/Login">
        <button className="login__registerButton rounded-sm w-full h-[30px] border-solid border-[1px] mt-[10px] border-t-[#a88734] border-r-[#9c7e31] border-b-[#846a29] border-l-[#846a29]" >
         Go back to Login
        </button></NavLink>
      </div>
    </div>
  );
  }


export default Signin;
