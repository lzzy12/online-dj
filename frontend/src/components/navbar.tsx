import { Input, Navbar, NavbarContent, NavbarItem, Snippet } from '@nextui-org/react'
import React from 'react'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilState } from 'recoil'
import { roomState } from '../atoms/room'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

function AppNavbar() {
  const [room] = useRecoilState(roomState);
  return (
    <Navbar className='w-full'>
        <NavbarContent justify='center' className='w-full'>
            <SearchBar/>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            {room.isAdmin ? <FontAwesomeIcon icon={faLock}/> : <FontAwesomeIcon icon={faUser}/>}
          </NavbarItem>
          <NavbarItem>
            <Snippet>{room.roomId}</Snippet>
          </NavbarItem>
        </NavbarContent>
    </Navbar>
  )
}

export default AppNavbar
