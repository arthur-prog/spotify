import React from 'react';
import './PlaylistComp.css';
import {Button} from "antd";
import {PlaylistInterface} from "../../Slices/playlistsSlice";



const PlaylistComp = (playlist: PlaylistInterface) => {
    const style = (color1: string, color2: string) => {
        return {
            background: "linear-gradient(" + color1 + "," + color2 + ")"
        };
    }

    return <Button className={"playlist-button"}>
        <div style={{display: "flex"}}>
            <div className={"playlist-img-bg"} style={style(playlist.color1, playlist.color2)}></div>
            <div className={"title-container"}>
                <p className={"playlist-title"}>{playlist.title}</p>
            </div>
        </div>
    </Button>;
};


export default PlaylistComp;
