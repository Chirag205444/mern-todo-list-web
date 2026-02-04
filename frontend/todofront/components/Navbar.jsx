import React, { useState } from 'react'
import { Link, useNavigate,NavLink,useLocation } from 'react-router-dom'
import { GiBookmark } from "react-icons/gi";
import { GiBookmarklet } from "react-icons/gi";


function Navbar() {
    const[isopen,setOpen]=useState(false);
    const name=localStorage.getItem("userName");
    const loaction=useLocation();
    const currentPath=loaction.pathname;
    const navigate=useNavigate();
    const handleClick=()=>{
      localStorage.removeItem("todo_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      navigate("/");
    }
  return (
    <>
      <nav>
         <div className='relative w-full justify-end shadow-md shadow-gray-400 h-15 flex items-center sm:justify-between bg-purple-100'>
            <button onClick={()=>setOpen(prev=>!prev)} className='block sm:hidden absolute left-0 px-5'>
                 { (isopen) ? <GiBookmarklet className='text-purple-600  text-2xl' /> : <GiBookmark className='text-2xl'/>}
            </button>
            <div className='text-2xl pr-8 sm:pl-8 sm:pr-0 text-shadow-md text-shadow-purple-300 tracking-tight  text-purple-900 font-bold'>
               <p className='rounded-full'>Time To Do It </p>
            </div>
            <div className='flex '>
               <div className='hidden  sm:block'>
                <NavLink  to="/yourtodo" className={`font-medium ${currentPath==="/yourtodo" ? "text-green-700":"text-purple-950 "}  text-sm tracking-widest px-3 sm:px-4 lg:px-6`}>Steps</NavLink>
                <NavLink  to="/yourtodo/path" className={`font-medium  ${currentPath==="/yourtodo/path" ? "text-green-700":"text-purple-900"} text-base tracking-widest px-3 sm:px-4 lg:px-6`}>Path</NavLink>
                <NavLink  to="/yourtodo/milestone" className={`font-normal  ${currentPath==="/yourtodo/milestone" ? "text-green-700":"text-[#4b009c]"}   px-3 text-lg tracking-wider sm:px-4 lg:px-6`}>Milestone</NavLink>
                <NavLink  to="/yourtodo/vision" className={`font-normal  ${currentPath==="/yourtodo/vision" ? "text-green-700":"text-purple-700"} px-3 text-xl sm:px-4 lg:px-6`}>Vision</NavLink>
                 <button onClick={handleClick} title={name} className='text-lg px-6  font-semibold cursor-pointer tracking-wide text-red-700'>Logout</button>
               </div>
           </div>
         </div>
         <div className={`${(isopen)?"flex":"hidden"} absolute rounded-br-xl shadow-xl shadow-gray-400 bg-purple-100  pt-3 px-2 py-2 w-2/3 sm:hidden h-[calc(100vh-60px)] flex-col justify-between text-white`}>
               <div className='flex  flex-col gap-1'>
                <Link to="/yourtodo" className='text-lg text-black rounded-lg font-semibold w-full hover:bg-[#7248a3] hover:text-white active:bg-[#7d50b2] active:text-white py-2 px-5 transition'>Steps</Link>
                <Link to="/yourtodo/path" className='text-lg text-black rounded-lg font-semibold w-full hover:bg-[#7248a3] hover:text-white active:bg-[#7d50b2] active:text-white py-2 px-5 transition'>Path</Link>
                <Link to="/yourtodo/milestone" className='text-lg text-black rounded-lg font-semibold w-full hover:bg-[#7248a3] hover:text-white active:bg-[#7d50b2] active:text-white py-2 px-5 transition'>Milestone</Link>
                <Link to="/yourtodo/vision" className='text-lg text-black rounded-lg font-semibold w-full hover:bg-[#7248a3] hover:text-white active:bg-[#7d50b2] active:text-white py-2 px-5 transition'>Vision</Link>
               </div>
                <div className='flex cursor-pointer text-lg active:opacity-70  text-gray-200 justify-center items-center h-10 w-full bg-red-500 rounded-xl  font-semibold px-3 '>
                    <button onClick={handleClick} title={name} className='w-full cursor-pointer   h-full'>Logout</button>
                </div>
               
           </div>
      </nav>
    </>
  )
}

export default Navbar
