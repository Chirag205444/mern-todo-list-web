import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModel from '../components/LoginModel';


function HomePage() {
const [isopen,setIsopen]=useState(false);

    const navigate=useNavigate()
   useEffect(()=>{
    const token=localStorage.getItem("todo_token");
    if(token){
        navigate("/yourtodo")
    }
   },[navigate])

   const openModel=()=>{
    
    setIsopen(true);
   }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-8 max-w-lg text-center lg:text-left">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-black mb-4">
              Say What To Do...!
            </h1>
            <p className="text-black text-md leading-relaxed">
              Start your day with clarity, not chaos. Write it down, get it done. <br />
              Small steps today build big wins tomorrow. A list turns dreams into achievable goals. <br />
              Stay focused, stay productive, stay stressfree.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <button onClick={()=>{navigate("/signup")}} className="px-6 py-3 cursor-pointer bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
              Get Started
            </button>
            <button onClick={()=>openModel()} className="px-6 py-3 border cursor-pointer border-black text-black rounded-lg hover:bg-gray-100 transition">
              Sign In
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center mt-10 lg:mt-0">
          <img
            src="/image1.png"
            alt="Todo Illustration"
            className="w-full max-w-md object-cover md:object-contain "
          />
        </div>

      </div>
      {(isopen) && <LoginModel onClose={()=>setIsopen(false)} />}
    </>
  );
}

export default HomePage;
