import { Input, Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'

function AppNavbar() {
  return (
    <Navbar>
        <NavbarContent>
            <Input label="Search"/>
        </NavbarContent>
    </Navbar>
  )
}

export default AppNavbar