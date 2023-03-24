import React from 'react';
import './MainBodyPlaylist.css';
import {PlaylistInterface} from "../Slices/playlistsSlice";
import PlaylistHeader from "./PlaylistHeader";
import SongList from "./SongList";

const MainBodyPlaylist = (playlist: PlaylistInterface) => {

    return <div id={"main-body-playlist"}>
        <PlaylistHeader id={playlist.id} title={playlist.title} songs={playlist.songs} color1={playlist.color1} color2={playlist.color2}/>
        <SongList id={playlist.id} title={playlist.title} songs={playlist.songs} color1={playlist.color1} color2={playlist.color2}/>
    </div>;
};



export default MainBodyPlaylist;
