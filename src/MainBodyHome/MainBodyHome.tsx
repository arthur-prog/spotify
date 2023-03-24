import React from 'react';
import './MainBodyHome.css';
import PlaylistComp from "./PlaylistComp";
import {Button} from "antd";
import Top50Comp from "./Top50Comp";
import {PlaylistInterface} from "../Slices/playlistsSlice";
import {useSelector} from "react-redux";
import {State} from "../store";
import {Link} from "react-router-dom";

const MainBodyHome = () => {
    const top50:PlaylistInterface[] = useSelector((state: State) => state.playlists.top50);
    const playlists:PlaylistInterface[] = useSelector((state: State) => state.playlists.items);

    return <div id={"main-body"}>
        <h1 className={"title"}>Your playlists</h1>
        <div className={"section"}>
            <Link to={"/playlist/liked-songs"}>
                <Button className={"playlist-button"}>
                    <div style={{display: "flex"}}>
                        <div className={"playlist-img-bg"} style={{background: "linear-gradient(135deg, #4000F4 0%, #603AED 22.48%, #7C6EE6 46.93%, #979FE1 65.71%, #A2B3DE 77.68%, #ADC8DC 88.93%, #C0ECD7 100%)"}}>
                            <svg className={"icon"} width="29" height="28" viewBox="0 0 29 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.1461 0.108231C19.7855 0.129394 18.4545 0.50922 17.2876 1.20935C16.1207 1.90948 15.1593 2.90512 14.5003 4.09573C13.8413 2.90512 12.8798 1.90948 11.713 1.20935C10.5461 0.50922 9.21511 0.129394 7.85446 0.108231C5.68543 0.202469 3.64186 1.15133 2.1702 2.74751C0.698542 4.34369 -0.0815698 6.45745 0.000295467 8.62698C0.000295467 16.8134 13.2388 26.2686 13.8019 26.6698L14.5003 27.164L15.1987 26.6698C15.7618 26.2711 29.0003 16.8134 29.0003 8.62698C29.0822 6.45745 28.302 4.34369 26.8304 2.74751C25.3587 1.15133 23.3152 0.202469 21.1461 0.108231Z"
                                    fill="white"/>
                            </svg>
                        </div>
                        <div className={"title-container"}>
                            <p className={"playlist-title"}>Liked Songs</p>
                        </div>
                    </div>
                </Button>
            </Link>;
            {playlists.map((playlist) => {
                if(playlist.title !== "Liked Songs")
                return <Link key={playlist.id} to={"/playlist/" + playlist.id}>
                    <PlaylistComp id={playlist.id} title={playlist.title} songs={playlist.songs} color1={playlist.color1} color2={playlist.color2}/>
                </Link>;
                return null;
            })}
        </div>
        <h1 className={"top50-title"}>TOP 50</h1>
        <div className={"section"}>
            {top50.map((playlist) => {
                return <Link key={playlist.id} to={"/playlist/" + playlist.id} className={"top50-link"}>
                    <Top50Comp id={playlist.id} title={playlist.title} songs={playlist.songs} color1={playlist.color1} color2={playlist.color2}/>
                </Link>;
            })}
        </div>
    </div>;
};



export default MainBodyHome;
