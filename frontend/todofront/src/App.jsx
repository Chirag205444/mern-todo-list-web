import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupPage from '../pages/SignupPage'
import HomePage from '../pages/HomePage'
import Todopage from '../pages/Todopage'
import ProtectedRoute from '../middlewareRoutes/ProtectedRoute'
import MainNavigation from '../components/MainNavigation'
import axios from 'axios'
import SkeletonLoading from '../components/SkeletonLoading'

const getAlltodo=async()=>{
  try{
    const token=localStorage.getItem("todo_token");
    if(!token) return [];
  let alltodos=[];
  let res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todo`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  alltodos=res.data.lists;
  return alltodos;
  }catch(err){
    console.error(err.response?.data?.message || err.message);
    return [];
  }
}

const byType = (type) => async () => {
  const todos = await getAlltodo();
  return todos.filter(t => t.type === type);
};



const mainRouter=createBrowserRouter([{
  path:"/",
  element:<HomePage/>
},
{
  path:"/signup",
  element:<SignupPage />
},
{
  path:"/yourtodo",
  element:(
   <ProtectedRoute>
    <MainNavigation />
   </ProtectedRoute>  
  ),
   children:[{
    index:true,
    element:<Todopage/>,
    loader:byType("daily"),
    hydrateFallbackElement: <SkeletonLoading/>
   },{
    path:"path",
    element:<Todopage/>,
    loader:byType("weekly"),
    hydrateFallbackElement:<SkeletonLoading/>
   },{
    path:"vision",
    element:<Todopage/>,
    loader:byType("yearly"),
    hydrateFallbackElement:<SkeletonLoading/>
   },{
    path:"milestone",
    element:<Todopage/>,
    loader:byType("monthly"),
    hydrateFallbackElement:<SkeletonLoading/>
   }]
}
])

function App() {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  )
}

export default App
