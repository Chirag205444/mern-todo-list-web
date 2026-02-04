import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import LoginModel from '../components/LoginModel';

function SignupPage() {
    const [name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [authReady, setAuthReady] = useState(false);
    const[open,setOpen]=useState(false);

    useEffect(() => {
  if (authReady) navigate("/yourtodo",{replace:true});;
    }, [authReady]);

 
    const navigate=useNavigate();
   const handleSubmit=async(e)=>{
        e.preventDefault();
     try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{name,email,password}).then((res)=>{
        console.log("sign up successfull");
         localStorage.setItem("todo_token", res.data.token);
         localStorage.setItem("userId", res.data.user._id);
         localStorage.setItem("userName", res.data.user.name);
         setAuthReady(true);
      })
     }catch(err){
       console.error(err.response?.data?.message || err.message);
     }
   }

  return (
    <>
      <div className='w-full relative min-h-screen flex-col flex md:justify-center items-center'>
        <div className='absolute cursor-pointer pl-3 pt-10 md:pt-3 text-3xl  top-0 left-0'><IoArrowBackCircleSharp onClick={()=>navigate("/")}/></div>
        <div className='items-start w-full mt-[15%] p-5 text-3xl font-bold  md:mt-0 md:text-4xl md:font-extrabold md:w-[50%]'>
          <h1>SignUp...</h1>
        </div>

        <div className='flex shadow-2xl  rounded-sm p-3 gap-2 md:gap-4 md:p-6 flex-col w-[80%] md:w-[50%]'>
          <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col gap-2 md:gap-8'>
            <div className='w-full flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
              <label htmlFor="name" className='md:text-lg font-medium md:w-[20%]'>
                Name
              </label>
              <input minLength={3} required onChange={(e)=>setName(e.target.value)} id="name" type="text" name='name'
                className='md:w-[80%] border-2 w-full border-gray-700 outline-none px-2 py-1 rounded-sm'/>
            </div>
            <div className='w-full flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
              <label htmlFor="email" className='md:text-lg font-medium md:w-[20%]'>
                Email
              </label>
              <input required onChange={(e)=>setEmail(e.target.value)} id="email" type="email" name='email'
                className='md:w-[80%] border-2 w-full border-gray-700 outline-none px-2 py-1 rounded-sm'/>
            </div>

            <div className='w-full flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
              <label htmlFor="password" className='md:text-lg font-medium md:w-[20%]'>
                Password
              </label>
              <input required minLength={6} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" name='password'
                className='md:w-[80%] border-2 w-full border-gray-700 outline-none px-2 py-1 rounded-sm'/>
            </div>
            <div className='w-full flex gap-3 flex-col mt-2 md:flex-row md:justify-between md:items-center'>
              <p onClick={()=>setOpen(true)} className='text-sm text-blue-700 cursor-pointer font-medium'>
                <u>already have an account</u>
              </p>
              <button type='submit' className='md:w-[30%] w-full active:opacity-80 cursor-pointer bg-black rounded-sm text-white px-2 py-1'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      {(open)&& <LoginModel onClose={()=>setOpen(false)}/>}
    </>
  )
}

export default SignupPage
