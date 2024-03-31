import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export interface TopSearchResult {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
}
export interface SongDetails {
    "320kbps": string;
    album: string;
    album_url: string;
    albumid: string;
    copyright_text: string;
    duration: string;
    encrypted_drm_media_url: string;
    encrypted_media_path: string;
    encrypted_media_url: string;
    featured_artists: string;
    featured_artists_id: string;
    has_lyrics: string;
    id: string;
    image: string;
    is_dolby_content: boolean;
    is_drm: number;
    label: string;
    label_url: string;
    language: string;
    lyrics_snippet: string;
    media_preview_url: string;
    media_url: string;
    music: string;
    music_id: string;
    origin: string;
    perma_url: string;
    play_count: number;
    primary_artists: string;
    primary_artists_id: string;
    release_date: string;
    singers: string;
    song: string;
    starred: string;
    starring: string;
    type: string;
    year: string;
}
type SearchSongsParams = {
    query: string;
}
const baseUrl = 'http://localhost:5100/result/'
const client = new axios.Axios({baseURL: baseUrl, withCredentials: false});
const saavnClient = new axios.Axios()
const searchSongs = async (params: SearchSongsParams): Promise<SongDetails[]> => {
    const res = await fetch(baseUrl + '?' + new URLSearchParams({
        query: params.query
    }), {
        method: "GET",

    });
    return (await res.json() ?? []) as SongDetails[];
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
    console.log(data);
    console.log(typeof(data))
    return (data ?? []) as TopSearchResult[];
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
    const {data: searchData, isLoading: searchLoading} = useQuery<SongDetails[], Error>([`search-${query}`], () => searchSongs({query}), {
        enabled: !!query && focussed
    });
    
    return {searchData, searchLoading, focussed, setFocussed, query, setQuery, onQueryChanged};
}