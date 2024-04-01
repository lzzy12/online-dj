import { Card, Skeleton } from '@nextui-org/react'


function SearchSkeletonTile() {
  return (
    <Card onClick={() => {}}>
    <div className='flex flex-row gap-4 mt-4 ml-4'>
        <Skeleton >
        <div className="h-16 w-16 rounded bg-default-300"></div>
        </Skeleton>
        <div className="flex flex-col gap-4">
            <Skeleton>
                <div className='h-4 w-20 bg-primary-50'/>
            </Skeleton>
            <Skeleton>
                <div className='h-4 w-16 bg-primary-50'/>
            </Skeleton>
        </div>
    </div>
    </Card>
  )
}

export default SearchSkeletonTile