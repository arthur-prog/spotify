import React from 'react';
import './Top50Comp.css';
import {Button} from "antd";
import {PlaylistInterface} from "../../Slices/playlistsSlice";



const Top50Comp = (playlist: PlaylistInterface) => {
    const style = (color1: string, color2: string) => {
        return {
            background: "linear-gradient(" + color1 + "," + color2 + ")"
        };
    }

    return <Button className={"top50-button"}>
        <div className={"top50-img-bg"} style={style(playlist.color1, playlist.color2)}>
            <p>TOP 50</p>
            <p>{playlist.title}</p>
        </div>
        <p className={'top50-title2'}>TOP 50</p>
        <p className={'top50-subtitle2'}>{playlist.title}</p>
    </Button>;
};


export default Top50Comp;
