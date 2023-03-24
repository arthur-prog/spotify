import React from 'react';
import "./Playlist.css";
import {useParams} from "react-router-dom";
import LeftSection from "../LeftSection";
import BottomBar from "../BottomBar";
import MainBodyPlaylist from "../MainBodyPlaylist";
import {useSelector} from "react-redux";
import {State} from "../store";
import {PlaylistInterface} from "../Slices/playlistsSlice";
import AddToPlaylistModal from "../MainBodyPlaylist/SongList/AddToPlaylistModal";
import AddPlaylistModal from "../LeftSection/AddPlaylistModal";

const Playlist = () => {

    let { id } = useParams();

    const top50:PlaylistInterface[] = useSelector((state: State) => state.playlists.top50);
    const playlists:PlaylistInterface[] = useSelector((state: State) => state.playlists.items);

    let playlist:PlaylistInterface | undefined = playlists.find((playlist:PlaylistInterface) => playlist.id === id);

    if(playlist === undefined){
        playlist = top50.find((playlist:PlaylistInterface) => playlist.id === id);
    }

    return <>
        <div>
            <div id={"playlist"}>
                <LeftSection></LeftSection>
                { playlist === undefined ?
                    (<div className={"wrong-id-div"}><h1 className={"wrong-id"}>No playlist with this id</h1></div>) :
                    (<MainBodyPlaylist id={playlist.id} title={playlist.title} songs={playlist.songs} color1={playlist.color1} color2={playlist.color2}/>)
                }
            </div>
            <BottomBar></BottomBar>
            <AddPlaylistModal />
            <AddToPlaylistModal/>
        </div>
    </>;
};



export default Playlist;
