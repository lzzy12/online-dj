import { useState } from 'react'
import './App.css'
import { RecoilRoot } from 'recoil'
import HomePage from './components/HomePage'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import MusicPlayer from './components/MusicPlayer'
import SocketContextProvider from './context/socket_context'
import {QueryClient, QueryClientProvider} from 'react-query'
import { Navbar } from '@nextui-org/react'
import AppNavbar from './components/navbar'


const reactQueryClient = new QueryClient()
function App() {
  return <RecoilRoot>
    <SocketContextProvider>
      <QueryClientProvider client={reactQueryClient} >
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/music" element={<MusicPlayer/>}/>
      </Routes>
      </QueryClientProvider>
      </SocketContextProvider>
  </RecoilRoot>
}

export default App
