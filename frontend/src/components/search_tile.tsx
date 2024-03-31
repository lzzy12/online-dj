import React from 'react'
import { SongDetails } from '../hooks/search_hook'
import { Card, Image } from '@nextui-org/react'


function SearchTile({image, title, subtitle, onClick}: {image: string,title: string, subtitle: string, onClick: VoidFunction}) {
    
  return (
    <Card isPressable={true} onPress={onClick} className='cursor-pointer w-full mt-2'>
    <div className='flex flex-row gap-4 p-2'>
        <Image src={image} height={50} width={50}/>
        <div className="flex flex-col justify-start text-start">
            <div>{title}</div>
            <div>{subtitle}</div>
        </div>
    </div>
    </Card>
  )
}

export default SearchTile