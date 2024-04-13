import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('');
    const [key,setKey] =useState('');
    const secure = "1234"
    const handleSearch = async(e) =>{
        console.log("email,password",email,password);
        e.preventDefault();
        if(key===secure){
            let result = await fetch('https://amazon-clone-back.vercel.app/login',{
      
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
              'Content-Type':'application/json'
            }
          });
          result =await result.json()
          console.warn(result);
          if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.User));
            localStorage.setItem("token",JSON.stringify(result.auth));
           
        
          }else{
            alert('please enter correct details')
          }
        

            navigate('/dashboard')
        }else{
            alert('Enter the correct password')
        }

    }
 
  return (
    <div className="login h-[100vh] flex flex-col">
      <NavLink to="/">
        <img className="login__logo mt-[20px] mb-[20px] object-contain w-[100px] mr-auto ml-auto" src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" alt="" />
      </NavLink>
      <div className="login__container w-[300px] h-fit flex flex-col rounded-md border-solid border-black border-[1px] p-[20px] ml-auto mr-auto ">
        <h1 className="header font-bold mb-[20px]">Sign-in</h1>
        <form >
          <h5 className="mail mb-[20px]">E-mail</h5>
          <input type="text" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]"value={email} onChange={(e)=>setEmail(e.target.value)} />
          <h5 className="pass mb-[20px]">Password</h5>
          <input type="password" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <h5 className="pass mb-[20px]">Security Key</h5>
          <input type="password" className="h-[30px] mb-[10px] bg-white w-[98%] border-black border-[1px]" value={key} onChange={(e)=>setKey(e.target.value)}/>
          <button className="login__signButton bg-[#f0c14b]  rounded-sm w-full h-[30px] border-solid border-[1px] mt-[10px] border-t-[#a88734] border-r-[#9c7e31] border-b-[#846a29]" onClick={handleSearch} >
            Sign In
          </button>
          
        </form>
        <NavLink to='/Signin'>
        <button className="login__registerButton rounded-sm w-full h-[30px] border-solid border-[1px] mt-[10px] border-t-[#a88734] border-r-[#9c7e31] border-b-[#846a29] border-l-[#846a29]" >
          Create your Amazon Account
        </button></NavLink>
      </div>
    </div>
  )
}

export default LoginAdmin
