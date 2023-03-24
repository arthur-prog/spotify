import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";
import {PlaylistInterface, setAddPlaylistModal} from "../Slices/playlistsSlice";
import {Button} from "antd";
import './LeftSection.css';
import {Link} from "react-router-dom";

const LeftSection = () => {
    const dispatch = useDispatch();
    const playlists:PlaylistInterface[] = useSelector((state: State) => state.playlists.items);

    const handleOnClickCreatePlaylist = () => {
        dispatch(setAddPlaylistModal(true));
    }

    return <div id={"menu"}>
        <img id={"logo"} src={"/../menu/spotify-logo.png"} alt="logo"/>
        <Link to="/">
            <Button id={"home-btn"}>
                <img id={"logo-home"} src={"/../menu/home.png"} alt="logo-home"/>
                <h1 id={"home-title"}>Home</h1>
            </Button>
        </Link>
        <div id={"middle-options"}>
            <Button className={"playlist-btn"} onClick={handleOnClickCreatePlaylist}>
                <div id={"white-rectangle"}>
                    <img id={"add"} src={"/../menu/add.png"} alt="add"/>
                </div>
                <h1 id={"create-playlist-title"}>Create Playlist</h1>
            </Button>
            <Link to={"/playlist/liked-songs"}>
                <Button id={"playlist-liked-btn"} onClick={() => {}} className={"playlist-btn"}>
                    <div id={"liked-bg"}>
                        <svg id={"like"} width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.14385 0.132462C6.73565 0.138811 6.33636 0.252758 5.9863 0.462797C5.63623 0.672836 5.34779 0.971529 5.15009 1.32871C4.9524 0.971529 4.66396 0.672836 4.31389 0.462797C3.96383 0.252758 3.56454 0.138811 3.15635 0.132462C2.50564 0.160733 1.89256 0.445391 1.45107 0.924246C1.00957 1.4031 0.775535 2.03723 0.800095 2.68809C0.800095 5.14402 4.77165 7.98059 4.94057 8.10094L5.15009 8.2492L5.35962 8.10094C5.52855 7.98131 9.5001 5.14402 9.5001 2.68809C9.52466 2.03723 9.29062 1.4031 8.84912 0.924246C8.40763 0.445391 7.79455 0.160733 7.14385 0.132462Z" fill="white"/>
                        </svg>
                    </div>
                    <h1 id={"create-playlist-title"}>Liked Songs</h1>
                </Button>
            </Link>
        </div>
        <div id={"playlists"}>
            {playlists.map((playlist:PlaylistInterface) => {
                if(playlist.title !== "Liked Songs")
                    return <Link key={playlist.id} className={"playlist-link"} to={"/playlist/" + playlist.id}>{playlist.title}</Link>;
                return null;
            })}
        </div>
    </div>;
};



export default LeftSection;
