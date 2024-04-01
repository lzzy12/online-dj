import { useRecoilState } from "recoil"
import { Music, musicAtom } from "../atoms/music"
import { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { roomAtom } from "../atoms/room";
import { SocketContext } from "../context/socket_context";
import { PlayerAction } from "../typing";
import { toast } from "react-toastify";

export const useMusic = () => {
    const [musicState, setMusic] = useRecoilState(musicAtom);
    const ref = useRef<ReactPlayer>(null);
    const [room, setRoom] = useRecoilState(roomAtom);
    const {socket} = useContext(SocketContext);
    const setVolume = (volume: number) => {
        setMusic({...musicState, volume})
    }


    useEffect(() => {
        socket?.on('play', (data: PlayerAction) => {
            changeMusic({
              image: data.imageUrl ?? "",
              provider: data.provider,
              srcUrl: data.songUrl,
            }, true)
          })
        
          socket?.on('pause', () => {
            pause()
          });
        
          socket?.on('resume', () => {
            resume()
          });
        
          socket?.on('error', ( {cause, error}: {cause: string, error: string}) => {
            console.log(error)
            console.log(cause);
            setRoom({...room,
              isWaitingForRoomId: false,
            })
            toast.error(error, {toastId: 'socket-error', position: 'bottom-left'})
          });
          return () => {socket?.offAny()}
    }, [musicState])
    const changeMusic = (music: Music, fromServer: boolean = false) => {
        if (!room.isAdmin && !fromServer){
            // User is trying to change music in a room where he is not the admin
            toast.error("You are not an admin of the current room");
            return;
        }
        setMusic({...musicState, currentMusic: music, playing: true, positionInSecs: 0})
        if (room.isAdmin){
            socket?.emit('play', {
                provider: music.provider,
                roomId: room.roomId,
                songUrl: music.srcUrl,
                imageUrl: music.image,
            } as PlayerAction)
        }
    }

    const toggleMute = () => {
        setMusic({...musicState, muted: !musicState.muted})
    }

    const onProgress = (state: {playedSeconds: number, played: number, loadedSeconds: number, loaded: number}) => {
        if (!musicState.sliding)    // Only want to update the slider if user is not seeking through it
            setMusic({...musicState, positionInSecs: state.playedSeconds})
    }

    const togglePlay = () => {
        if (!musicState.currentMusic) return;
        const {playing} = musicState
        setMusic({...musicState, playing: !playing})
        if (room.isAdmin){
            socket?.emit(playing? 'pause': 'resume', {roomId: room.roomId});
        }
    }

    const getReadableTime = (secs: number) => {
        const min = Math.floor(secs / 60);
        const sec = Math.floor(secs % 60);
        return `${min < 10? `0${min}`: min}:${sec < 10? `0${sec}`: sec}`
    }

    const onDuration = (duration: number) => {
        setMusic({...musicState, durationInSecs: duration})
    }

    const onSeeking = (value: number) => {
        setMusic({...musicState, sliding: true, positionInSecs: value})
    }

    const onSeekCapture = () => {
        setMusic({...musicState, sliding: false})
        ref.current?.seekTo(musicState.positionInSecs ?? 0);
    }

    const pause = () => {
        console.log(musicState)
        if (!musicState.currentMusic) return;
        setMusic({...musicState, playing: false});
    }
    const resume = () => {
        console.log('resume')
        console.log(musicState)
        if (!musicState.currentMusic) return;
        setMusic({...musicState, playing: true});
        
    }
    return {
        setVolume, volume: musicState.volume, 
        currentMusic: musicState.currentMusic, changeMusic,
        muted: musicState.muted,
         toggleMute, duration: getReadableTime(musicState.durationInSecs ?? 0),
          position: getReadableTime(musicState.positionInSecs ?? 0), onProgress,
          positionInSecs: musicState.positionInSecs,
          togglePlay, playing: musicState.playing,
          onDuration,
          progress: ((musicState.positionInSecs ?? 0) / (musicState?.durationInSecs ?? 1)),
          durationInSecs: musicState.durationInSecs,
          onSeeking,
          onSeekCapture,
          ref,
          pause, resume,
        }

}