import {  faBackwardStep, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppNavbar from './navbar'
import { Image, Slider } from '@nextui-org/react'
import ReactPlayer from 'react-player/lazy'
import { useCheckRoomJoined} from '../hooks/socketio_connect'
import { useMusic } from '../hooks/useMusic'
import ChatComponent from './Chat'

function MusicPlayer() {
  useCheckRoomJoined();
  const { ref, togglePlay, playing, currentMusic, duration,
     position, onProgress, muted, onDuration, durationInSecs,
      onSeeking, onSeekCapture, positionInSecs} = useMusic();

  // console.log(currentMusic.sr)
  return (
    <div className='flex flex-col w-full justify-between h-svh'>
    <AppNavbar />
    <div className='flex flex-row w-full h-full'>
      <div className='w-2/3 h-full py-4 px-4 flex items-center'>{
          currentMusic?.provider === 'jio' ? (
            <div className='ml-auto mr-auto'>
              <Image src={currentMusic.image} width={'100%'} height={'100%'} onClick={togglePlay}/> 
              <ReactPlayer ref={ref} url={currentMusic.srcUrl} playing={playing} onProgress={onProgress} height={0} width={0} muted={muted} onDuration={onDuration}/>
            </div>
          ) : (
            <ReactPlayer ref={ref} url={currentMusic?.srcUrl as string?? null} playing={playing} onProgress={onProgress} height={'100%'} width={'100%'} muted={muted} onDuration={onDuration}/>
          )
       }</div>
      <div className='w-1/3 h-96 ml-4'><ChatComponent/></div>
    </div>
      <div className='mt-auto bg-[#212121] w-svw h-24 top'>
        <div className='flex first:mr-auto last:ml-auto relative h-full justify-evenly'>
          <div className="flex w-64 justify-between left-4 ml-4 items-center">
            <FontAwesomeIcon icon={faBackwardStep} size={'2x'}/>
            <FontAwesomeIcon icon={playing?faPause: faPlay} size={'2x'} onClick={togglePlay}/>
            <FontAwesomeIcon icon={faForwardStep} size={'2x'}/>
            <div className="text-sm">{position} / {duration}</div>
          </div>
          <div className="flex justify-between items-center w-1/2">
          <Slider aria-labelledby='music-player-position' color='secondary' value={positionInSecs ?? 0} minValue={0} maxValue={durationInSecs ?? 0} onChange={(val) => onSeeking(val as number)} onChangeEnd={onSeekCapture}/>
        </div>
        <div className="flex justify-between items-center w-1/6">
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default MusicPlayer