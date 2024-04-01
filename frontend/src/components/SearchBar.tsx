
import { Input } from '@nextui-org/react';
import { useSearch } from '../hooks/search_hook';
import SearchTile from './search_tile';
import SearchSkeletonTile from './SearchTileSkeleton';
import { useMusic } from '../hooks/useMusic';

function SearchBar() {

  const { searchData, searchLoading, focussed, setFocussed, onQueryChanged, isSearchError } = useSearch();
  const {changeMusic} = useMusic();
  return (
    <div className='flex flex-col w-full relative' onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}>
      <Input label="Search" type='text' onValueChange={onQueryChanged} />
      {focussed ? <div className='h-96 bg-[#212121] w-full rounded-b-xl absolute top-full z-50 overflow-auto'>
        {isSearchError? "Something went wrong": (searchLoading) ? [1, 2, 3, 4].map((i) => <SearchSkeletonTile key={i}/>)
          : searchData?.map((val) => <SearchTile key={val.id} title={val.name} subtitle={val.creators} image={val.image} onClick={() => { 
            console.log(`Playing ${val.name}`)
            changeMusic({
              image: val.image,
              provider: val.provider,
              srcUrl: val.srcUrl
            })
            setFocussed(false)
          }} />)}
      </div> : <div> </div>}
    </div>
  )

}
export default SearchBar