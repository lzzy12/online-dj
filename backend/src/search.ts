import { Router } from 'express';
import axios from 'axios';
import { client } from './redisClient';
import { SongDetails } from './typings';
import { DATA_API_KEY } from './secrets';

const router = Router();

router.get('/search', async (req, res) => {
    const db = await client;
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    // Regex to match YouTube video URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    const match = (query as string).match(youtubeRegex);
    console.log(match);
    if (!match) {
        try {
            console.log("Searching in JioSaavn")
            // Call the default endpoint to fetch the result from JioSaavn
            const response = await axios.get('http://localhost:5100/result/', {
                params: {
                    'query': query,
                },
                withCredentials: false,
            });
            const data = response.data;
            const result = [...data.map((e: any) => {
                return {
                    creators: e['singers'],
                    id: e['id'],
                    image: e['image'],
                    name: e['album'],
                    provider: 'jio',
                    srcUrl: e['media_url'],
                } as SongDetails
            })] as SongDetails[];
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching result:', error);
            return res.status(500).json({ error: 'Failed to fetch result' });
        }
    }

    const videoId = match[3];
    var songDetails;
    try {
        const res = await db.get(`yt_${videoId}`);
        songDetails = JSON.parse(res ?? "{}");
    } catch (e) {
        console.error('Error fetching video details from cache:', e);
    }
    console.log(songDetails)
    try {
        if (!(songDetails?.id)) {
            console.log("Fetching from Data API")
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: DATA_API_KEY
                }
            });
            const videoDetails = response.data.items[0].snippet;
            songDetails = {
                creators: videoDetails.channelTitle,
                id: videoId,
                image: videoDetails.thumbnails?.default.url,
                name: videoDetails.title,
                provider: 'others',
                srcUrl: `https://www.youtube.com/watch?v=${videoId}`,
            } as SongDetails;
            db.set(`yt_${videoId}`, JSON.stringify(songDetails));
        }
        return res.json([songDetails]);
    } catch (e) {
        console.error('Error fetching video details:', e);
        return res.status(500).json({ error: 'Failed to fetch video details' });
    }
});
export default router;