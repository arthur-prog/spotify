import React from 'react';
import './PlaylistHeader.css';
import {PlaylistInterface} from "../../Slices/playlistsSlice";



const PlaylistHeader = (playlist: PlaylistInterface) => {
    const style = (color1: string, color2: string) => {
        let deg: string = "";
        if(playlist.title === "Liked Songs")
            deg = "135deg,"
        return {
            background: "linear-gradient("+ deg + color1 + "," + color2 + ")"
        };
    }

    const styleBg = (color1: string, color2: string) => {
        return {
            background: "linear-gradient(135deg," + color1 + "," + color2 + ")"
        };
    }

    return <div>
        <div style={styleBg(playlist.color1, playlist.color2)} className={"playlist-header-bg"}></div>
        <div className={"playlist-header"}>
            <div className={"playlist-header-img-bg"} style={style(playlist.color1, playlist.color2)}>
                {playlist.title === "Liked Songs" ?
                    (<div style={{margin: "68px 0 0 68px"}}><svg width="55" height="51" viewBox="0 0 55 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.7203 0.650208C37.2031 0.689361 34.7408 1.39204 32.5821 2.68728C30.4233 3.98252 28.6446 5.82446 27.4255 8.02708C26.2064 5.82446 24.4276 3.98252 22.2689 2.68728C20.1102 1.39204 17.6479 0.689361 15.1307 0.650208C11.118 0.824549 7.33737 2.57994 4.61481 5.53288C1.89224 8.48581 0.449032 12.3963 0.600483 16.4099C0.600483 31.5548 25.0917 49.047 26.1334 49.7891L27.4255 50.7034L28.7176 49.7891C29.7593 49.0515 54.2505 31.5548 54.2505 16.4099C54.4019 12.3963 52.9587 8.48581 50.2362 5.53288C47.5136 2.57994 43.733 0.824549 39.7203 0.650208Z" fill="white"/>
                    </svg></div>) : (<div></div>)
                }
            </div>
            <div className={"header-title-container"}>
                <p className={"playlist-header-title"}>{playlist.title}</p>
            </div>
    </div></div>;
};


export default PlaylistHeader;
