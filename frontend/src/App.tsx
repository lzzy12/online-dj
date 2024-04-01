import './App.css'
import { RecoilRoot } from 'recoil'
import HomePage from './components/HomePage'
import { Route, Routes} from 'react-router-dom'
import MusicPlayer from './components/MusicPlayer'
import SocketContextProvider from './context/socket_context'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ToastContainer } from 'react-toastify'


const reactQueryClient = new QueryClient()
function App() {
  return <RecoilRoot>
    <SocketContextProvider>
      <QueryClientProvider client={reactQueryClient} >
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/music" element={<MusicPlayer/>}/>
      </Routes>
      <ToastContainer />

      </QueryClientProvider>
      </SocketContextProvider>
  </RecoilRoot>
}

export default App
