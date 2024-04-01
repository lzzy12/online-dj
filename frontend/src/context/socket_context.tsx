import { createContext, useState } from "react";
import { Socket } from "socket.io-client";


export const SocketContext = createContext<{socket: Socket | null, setSocket: ((socket: Socket) => void) }>({ socket: null, setSocket: () => {}});


export function SocketContextProvider({children}: {children: any}) {
  const [socket, setSocket] = useState<Socket | null>(null)
  return (
    <SocketContext.Provider value={{socket, setSocket}}>
    {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider