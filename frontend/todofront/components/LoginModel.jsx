import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate ,useRevalidator} from 'react-router-dom';

function LoginModel({onClose}) {
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [error,setError]=useState(false);
   const navigate=useNavigate()
   const {revalidate}=useRevalidator()

   const setemail=(e)=>{
    setEmail(e.target.value);
   }
   const setpassword=(e)=>{
    setPassword(e.target.value);
   }

   const handleOnSubmit =async(e)=>{
     e.preventDefault()
     try{
      let res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{email,password});
      localStorage.setItem("todo_token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      revalidate();
      navigate("/yourtodo",{replace:true});
     }catch(err){
      setError(true)
         setTimeout(()=>{
          setError(false);
         },5000);
         console.error(err.response?.data?.message || err.message);
     }
    
     
   }
   

  return (
      <>
       <div className="fixed inset-0 flex items-center z-40  justify-center" >
      <div className="absolute inset-0 bg-black/30  backdrop-blur-sm" onClick={onClose}></div>   
      <div className="relative w-full sm:w-[50%] lg:w-[30%] py-4  bg-white rounded-lg shadow-lg">
         <form className=' flex flex-col gap-3 h-full p-5' onSubmit={(e)=>{handleOnSubmit(e);}} action="">
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-9 '>
            <label className='text-black font-bold' htmlFor="">E-mail</label>
            <input className='w-full md:w-[70%] outline-none border-2 border-gray-700 rounded-sm h-[30%] px-3 py-2' value={email} required type="email" name="email" id="email" placeholder='email' onChange={(e)=>{setemail(e)}} />
        </div>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3 '>
            <label className='text-black  font-bold' htmlFor="">Password</label>
            <input className='w-full md:w-[70%] outline-none  border-2 border-gray-700 rounded-sm h-[30%] px-3 py-2' value={password}  required type="password" name="password" id="password" placeholder='password' onChange={(e)=>{setpassword(e)}} />
        </div>
          <div className='w-full md:pr-5  flex items-center mt-3 md:justify-end'>
            <button type='submit' className=' w-full md:max-w-[35%] px-3 py-2 cursor-pointer rounded-sm font-semibold text-white bg-black'>Signin</button>
          </div>
      </form>
      <div className='width-full pl-3 items-center font-semibold text-xs text-red-600'><p>{(error) ? "**something is invalid" : ""}</p></div>
         
      </div>
    </div>
    </>
  )
}

export default LoginModel

