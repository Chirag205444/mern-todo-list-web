import React, { useEffect, useState } from 'react'
import { FiCheckCircle } from "react-icons/fi";
import { BsExclamationCircle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import axios from 'axios';
import { useLoaderData ,useRevalidator } from 'react-router-dom';
import SkeletonLoading from '../components/SkeletonLoading'

function Todopage() {
  const todos=useLoaderData();
  const[todo,setTodos]=useState(todos);
  const [title,setTitle]=useState("");
  const[type,setType]=useState("daily");
  const [description,setDesciption]=useState("");

  const {revalidate}=useRevalidator();
  const token=localStorage.getItem("todo_token");

  useEffect(()=>{
    setTodos(todos)
  },[todos])

  

  const toggleComplete = async (id,title,description) => {
  setTodos(prev =>
    prev.map(todo =>
      todo._id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );

  try{
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`,
    {title,description,completed: !todo.find(t => t._id === id).completed},
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );
  }catch(err){
    console.error(err.response?.data?.message || err.message);
  }
};


  const onHandleSubmit=async(e)=>{
    try{
      e.preventDefault();
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todo`,{title,description,type},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
     // setTodos(prev => [...prev, res.data.list]);
      setTitle("");
      setDesciption("");
      setType("daily");
      revalidate();
    }
    catch(err){
       console.error(err.response?.data?.message || err.message);
    }
  }
  
  const deleteTodo=async(id)=>{
  try{
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    let deleted=todo.filter(filtered=>filtered._id!=id);
    setTodos(deleted);
  }catch(err){
     console.error(err.response?.data?.message || err.message);
  }
  }

  return (
    <>
     
      <div className='w-full relative p-4 h-[calc(100vh-60px)] bg-purple-200 flex flex-col sm:flex-row gap-2   justify-between  bg-repeat bg-[length:50%_50%]  bg-[url("/img3.png")]'>
        <div class="absolute inset-0 bg-black/20"></div>
        <div className='relative sm:max-h-80 sm:w-[35%] shadow-xl shadow-gray-700 w-full bg-gray-100 rounded-lg max-h-45'>
           <div className='w-full h-full p-4'>
             <form action="" onSubmit={(e)=>{onHandleSubmit(e)}} className='sm:gap-5 flex flex-col gap-3'>
              <div  className='sm:flex-col sm:w-full flex  justify-between' >
                <label className='text-lg  font-medium tracking-wider' htmlFor="">Title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)}  type="text" className='sm:w-full w-[70%] px-2 py-1 rounded-lg border-2 outline-none border-gray-700' />
              </div>
              <div className='sm:flex-col sm:w-full flex justify-between'>
                <label  className='text-lg  font-medium tracking-wider' htmlFor="">About</label>
                <input value={description} onChange={(e)=>setDesciption(e.target.value)} type="text" className='sm:w-full  w-[70%] px-2 py-1 border-2 rounded-lg outline-none border-gray-700'/>
              </div> 
              <div className='sm:flex-col mt-2 w-full flex justify-between items-center flex-row'>
                <div className='sm:w-full sm:flex sm:justify-baseline'>
                  <select value={type} onChange={(e)=>{setType(e.target.value)}} className='outline-none font-medium px-2 py-1 rounded-sm border-2 border-gray-700' name="type" id="type">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                </div>
              <div className='sm:w-full'>
                <button type='submit' className='sm:w-full sm:py-2 sm:mt-4 mt-1 text-white cursor-pointer bg-green-700 px-3 py-1 rounded-sm transition-transform duration-150 
                 active:scale-95'>Create Task</button>
              </div>
            </div>
             </form>
           </div>
        </div>


        <div className='relative sm:w-[65%] sm:h-full px-4 py-4 overflow-y-scroll w-full rounded-lg bg-gray-100 h-full'>
            <div className='w-full sm:flex-row sm:h-0 sm:flex-wrap flex flex-col gap-3 h-full'>
              { todo.map((td)=>(
                <div key={td._id} className={`w-full sm:p-2  shadow-md shadow-gray-500  sm:relative sm:flex-col sm:w-35 sm:h-40 bg-yellow-100  border-2 flex justify-between items-center ${(td.completed) ?"sm:border-green-600 shadow-green-400":"sm:border-red-500"} border-purple-800 sm:rounded-2xl rounded-sm h-15 px-3`}>
                  <div className='sm:border-none sm:p-0 sm:h-17  pr-5 pl-2 h-full border-r-2 border-r-purple-800 flex items-center justify-center' >
                      {(td.completed)? <FiCheckCircle  onClick={() => toggleComplete(td._id,td.title,td.description)} className='cursor-pointer text-green-600 sm:absolute sm:top-2 text-2xl'/> :<BsExclamationCircle  onClick={() => toggleComplete(td._id,td.title,td.description)} className='cursor-pointer text-red-700 sm:absolute sm:top-2 text-2xl'/>}
                  </div>
                  <div className='w-full sm:flex-col sm:p-2  sm:border-none text-xl font-medium tracking-widest border-r-2 h-full px-3 items-center border-r-purple-800 flex justify-between'>
                      <p title={td.description} className='cursor-pointer -tracking-tight text-[#041fb6] overflow-hidden'>{td.title}</p>
                      <div className='flex flex-col sm:w-full sm:justify-center sm:flex-row gap-2'>
                        <MdAutoDelete onClick={()=>{deleteTodo(td._id)}} className='text-red-800 cursor-pointer text-base'/>
                      </div>
                  </div>
                  <div className='pl-3 flex flex-col justify-center items-center sm:flex-row sm:pl-0 sm:flex sm:w-full sm:justify-around'>
                    <time className='font-medium text-gray-700' dateTime="">{td.time}</time>
                    <p className='font-medium text-gray-700'>{td.day}</p>
                  </div>
              </div>
              ))

              }
            </div>
        </div>
      </div>
    </>
  )
}

export default Todopage
