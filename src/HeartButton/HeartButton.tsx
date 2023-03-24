import React from 'react';
import './HeartButton.css';
import {PlaylistInterface, setPlaylists, SongInterface} from "../Slices/playlistsSlice";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";

interface HeartButtonInterface{
    songTitle: string,
    songArtist: string,
    size: number
}
const HeartButton = ({songTitle, songArtist, size}: HeartButtonInterface) => {
    const dispatch = useDispatch();
    const playlists:PlaylistInterface[] = useSelector((state: State) => state.playlists.items);
    const playlistLikedSongs: PlaylistInterface | undefined = playlists.find((playlist: PlaylistInterface) => playlist.title === "Liked Songs");

    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    let isLiked: boolean = false;

    if(playlistLikedSongs){
        const song : SongInterface|undefined = playlistLikedSongs!.songs.find((song: SongInterface) => song.title === songTitle)
        if(song){
            isLiked = true
        }
    }

    const songs: [] = require("./../static/data.json");

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, title: string, artist: string) => {
        e.stopPropagation();
        const songJson = songs.find((song) => song["title"] === title && song["artist"] === artist);
        const song: SongInterface = {
            id: randomId(),
            title: songJson!["title"],
            year: songJson!["year"],
            artist: songJson!["artist"],
            genre: songJson!["genre"],
            duration: songJson!["duration"],
            popularity: songJson!["popularity"]
        }
        let newPlaylists: PlaylistInterface[] = playlists.filter((playlist: PlaylistInterface) => playlist !== playlistLikedSongs);
        if(!isLiked){
            let newPlaylistLikedSongs: PlaylistInterface = {
                id: playlistLikedSongs!.id,
                title: playlistLikedSongs!.title,
                songs: [...playlistLikedSongs!.songs, song],
                color1: playlistLikedSongs!.color1,
                color2: playlistLikedSongs!.color2
            }
            newPlaylists.unshift(newPlaylistLikedSongs);
            dispatch(setPlaylists(newPlaylists));
        } else {
            let newSongs: SongInterface[] = playlistLikedSongs!.songs.filter((song: SongInterface) => song.title !== title && song.artist !== artist)
            let newPlaylistLikedSongs: PlaylistInterface = {
                id: playlistLikedSongs!.id,
                title: playlistLikedSongs!.title,
                songs: newSongs,
                color1: playlistLikedSongs!.color1,
                color2: playlistLikedSongs!.color2
            }
            newPlaylists.unshift(newPlaylistLikedSongs);
            dispatch(setPlaylists(newPlaylists));
        }
    }

    return <div className={"heart-button"} onClick={(e) => handleOnClick(e, songTitle, songArtist)}>
        {!isLiked ?
        (<svg width={size} height={size} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.45657 0.747537C7.85098 0.584114 8.27372 0.5 8.70064 0.5C9.12757 0.5 9.55031 0.584114 9.94472 0.747537C10.3391 0.910931 10.6973 1.1504 10.9991 1.45228C11.301 1.75405 11.5406 2.1125 11.704 2.50684C11.8674 2.90125 11.9516 3.32399 11.9516 3.75091C11.9516 4.17784 11.8674 4.60058 11.704 4.99499C11.5406 5.38936 11.3011 5.74767 10.9992 6.04947C10.9992 6.04949 10.9992 6.04944 10.9992 6.04947L6.5792 10.4695C6.38394 10.6647 6.06735 10.6647 5.87209 10.4695L1.45209 6.04947C0.842478 5.43985 0.5 4.61304 0.5 3.75091C0.5 2.88879 0.842478 2.06197 1.45209 1.45236C2.06171 0.842745 2.88852 0.500267 3.75065 0.500267C4.61277 0.500267 5.43958 0.842745 6.0492 1.45236L6.22565 1.62881L6.40201 1.45244C6.40198 1.45247 6.40204 1.45241 6.40201 1.45244C6.7038 1.15053 7.0622 0.910946 7.45657 0.747537ZM8.70064 1.5C8.40508 1.5 8.11241 1.55823 7.83936 1.67137C7.56631 1.78451 7.31823 1.95034 7.10928 2.15938L6.5792 2.68947C6.38394 2.88473 6.06735 2.88473 5.87209 2.68947L5.34209 2.15947C4.92001 1.73739 4.34755 1.50027 3.75065 1.50027C3.15374 1.50027 2.58128 1.73739 2.1592 2.15947C1.73712 2.58154 1.5 3.154 1.5 3.75091C1.5 4.34782 1.73712 4.92028 2.1592 5.34236L6.22565 9.40881L10.2921 5.34236C10.5011 5.13341 10.667 4.88525 10.7802 4.61219C10.8933 4.33914 10.9516 4.04648 10.9516 3.75091C10.9516 3.45535 10.8933 3.16268 10.7802 2.88963C10.667 2.61658 10.5012 2.36849 10.2922 2.15955C10.0832 1.95051 9.83498 1.78451 9.56193 1.67137C9.28887 1.55823 8.99621 1.5 8.70064 1.5Z" fill="#FCFCFC"/>
        </svg>) :
        (<svg width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6281 1.99432C11.2835 1.64727 10.8737 1.37176 10.4222 1.18362C9.97077 0.99549 9.48658 0.898446 8.99749 0.898071C8.07238 0.898223 7.18105 1.24574 6.49999 1.87182C5.81899 1.24564 4.92762 0.8981 4.00249 0.898071C3.51283 0.898581 3.0281 0.995921 2.5762 1.18449C2.1243 1.37306 1.71415 1.64913 1.36936 1.99682C-0.101262 3.4737 -0.100637 5.7837 1.37061 7.25432L6.49999 12.3837L11.6294 7.25432C13.1006 5.7837 13.1012 3.4737 11.6281 1.99432Z" fill="#1DB954"/>
        </svg>)
        }


    </div>;
};


export default HeartButton;
