import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../secrets";

export interface TopSearchResult {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
}

export interface SongDetails {
    name: string;
    id: string;
    image: string;
    creators: string;
    srcUrl: string;
    provider: 'jio' | 'others';
}
type SearchSongsParams = {
    query: string;
}
const baseUrl = import.meta.env.VITE_SERVER_URL;
console.log(baseUrl)
const client = new axios.Axios({
    baseURL: baseUrl,
    withCredentials: false,
})
const searchSongs = async (params: SearchSongsParams): Promise<SongDetails[]> => {
    const res = await client.get('/search', {
        withCredentials: false,
        params: {
            query: params.query
        }
    });
    const data = JSON.parse(res.data);
    return (data ?? []) as SongDetails[];
}

const fetchTopSearches = async (): Promise<TopSearchResult[]> => {
    const res = await fetch('https://www.jiosaavn.com/api.php?__call=content.getTopSearches&ctx=web6dot0&api_version=4&_format=json&_marker=0', {
        mode: "no-cors",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        }
    });
    console.log("fetched")
    const data = await res.json()
    return (JSON.parse(data) ?? []) as TopSearchResult[];
}

// const fetchSongDetails = async() : Promise<SongDetails> => {
    
// }

export const useSearch = () => {
    const [query, setQuery] = useState<string>('');
    var timer: number | undefined;
    const onQueryChanged = (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(query)
        setQuery(value);
      }, 500)
    }
    const [focussed, setFocussed] = useState<boolean>(false);
    const {data: searchData, isLoading: searchLoading, isError: isSearchError} = useQuery<SongDetails[], Error>([`search-${query}`], () => searchSongs({query}), {
        enabled: !!query && focussed
    });
    console.log(searchData);
    return {isSearchError, searchData, searchLoading, focussed, setFocussed, query, setQuery, onQueryChanged};
}