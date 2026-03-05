
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Register from './components/register/Register'
import Home from './components/home/Home'
import Notfound from './components/notfound/Notfound.'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import UserContextProvider from './components/context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/publicRoute/PublicRoute'
import PostCard from './components/PostCard/PostCard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import PostDetails from './components/PostDetails/PostDetails'


const query = new QueryClient();



function App() {
  
  const router = createBrowserRouter([
    {path: '/' , element: <Layout /> , children: [
      {index: true , element: <ProtectedRoute><Home /></ProtectedRoute>},
      {path: '/profile' , element: <ProtectedRoute><Profile /></ProtectedRoute>},
      {path: '/postdetails/:id' , element: <ProtectedRoute><PostDetails /></ProtectedRoute>},
      {path: '/register' , element: <PublicRoute><Register /></PublicRoute>},
      {path: '/login' , element: <PublicRoute><Login /></PublicRoute>},
      {path: '/posts' , element: <ProtectedRoute><PostCard /></ProtectedRoute>},
      {path: '*' , element: <Notfound />},
    ]},
  ])

  return (
    <>
      
    <UserContextProvider>
      <QueryClientProvider client={query}>

        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools/>

      </QueryClientProvider>
    </UserContextProvider>
    



    </>
  )
}

export default App
