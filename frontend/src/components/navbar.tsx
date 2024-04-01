import {Snippet } from '@nextui-org/react'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilState } from 'recoil'
import { roomAtom } from '../atoms/room'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

function AppNavbar() {
  const [room] = useRecoilState(roomAtom);
  return (
    <div className='w-full flex justify-evenly h-20 items-center'>
    <div className='w-full'></div>
    <div className='text-center items-center flex-grow mr-auto w-full py-4'>
      <SearchBar/>
    </div>
    <div className='w-full ml-auto flex items-center space-x-4 justify-end mr-4'>
      {room.isAdmin ? <FontAwesomeIcon icon={faLock}/> : <FontAwesomeIcon icon={faUser}/>}
      <Snippet>{room.roomId}</Snippet>
    </div>
  </div>)
}

export default AppNavbar
