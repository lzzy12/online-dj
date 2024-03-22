import { faBackward, faBackwardStep, faForwardStep, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function MusicPlayer() {
  return (
    
      <div className='absolute bg-[#212121] bottom-0 left-0 right-0 w-svw h-24'>
        <div className='flex first:mr-auto last:ml-auto relative h-full'>
          <div className="flex w-1/6 justify-between left-4 ml-4 items-center">
            <FontAwesomeIcon icon={faBackwardStep} size={'2x'}/>
            <FontAwesomeIcon icon={faPlay} size={'2x'}/>
            <FontAwesomeIcon icon={faForwardStep} size={'2x'}/>
            <div className="text-sm">1:33 / 4:30</div>
          </div>
        </div>
      </div>
  )
}

export default MusicPlayer