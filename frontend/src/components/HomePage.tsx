import { Button, Chip, CircularProgress, Image, Input, semanticColors } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faPlus } from '@fortawesome/free-solid-svg-icons'
import coverImg from '../assets/dj_home.jpeg'
import React, { useState } from 'react'
import { useSocketIO } from '../hooks/socketio_connect'
import { redirect } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { roomAtom } from '../atoms/room'
import { ToastContainer } from 'react-toastify'

function HomePage() {
  const {createRoom,joinRoom} = useSocketIO();
  const [room] = useRecoilState(roomAtom);
  const [roomIdInput, setRoomIdInput] = useState<string | null>(null);

  const onJoinClicked = () => {
    if (roomIdInput) {
      joinRoom(roomIdInput);
    }
  }
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex-auto bg-[#323232] relative flex items-center justify-center">
        <div id="svhh">
          <div className='mb-4 flex items-center'>
            <Chip className='mr-4' color='secondary'>
              <FontAwesomeIcon icon={faHeadphones} color={semanticColors.dark.foreground[900]}/> 
            </Chip>
            <span className="text-white">DjConnect</span>
          </div>
          <div className='font-extrabold font-serif text-4xl text-white'>Create or Join</div>
          <div className="text-xl mt-4 mb-6 text-white">
            Sign in, create a room, share the ID, and enjoy music with friends.
          </div>
          <div className="flex gap-4 relative items-center justify-center text-white">
            {!room.isWaitingForRoomId?<Button color='secondary' className='p-7' onClick={() => {createRoom(); }}>
              <span className="text-white">New Room </span><FontAwesomeIcon icon={faPlus} color={semanticColors.dark.secondary[900]}/>
            </Button>: <CircularProgress aria-labelledby='loading room'/>}
            <Input type='text' label="Enter room id" onChange={(event) => setRoomIdInput(event.target.value)}/>
            {!room.isWaitingForRoomId? <Button variant='faded' onClick={onJoinClicked}>Join</Button>: <CircularProgress/>}
          </div>
        </div>
      </div>
        <Image src={coverImg} className='h-svh flex-auto'/>

    </div>
  )
}

export default HomePage
