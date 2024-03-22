import { createContext, useState } from "react";
import { Socket } from "socket.io-client";
import React from 'react'


export const SocketContext = createContext<{socket: Socket | null, setSocket: ((socket: Socket) => void) }>(null);


export function SocketContextProvider({children}) {
  const [socket, setSocket] = useState<Socket | null>(null)
  return (
    <SocketContext.Provider value={{socket, setSocket}}>
    {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider