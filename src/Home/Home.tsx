import React from 'react';
import LeftSection from "../LeftSection";
import MainBodyHome from "../MainBodyHome";
import "./Home.css";
import BottomBar from "../BottomBar";
import {useDispatch, useSelector} from "react-redux";
import {PlaylistInterface, setTop50} from "../Slices/playlistsSlice";
import {State} from "../store";
import randomColor from "randomcolor";
import {randomId} from "../utils";
import AddPlaylistModal from "../LeftSection/AddPlaylistModal";

const Home = () => {
    const dispatch = useDispatch();
    const top50:PlaylistInterface[] = useSelector((state: State) => state.playlists.top50);

    const songs: [] = require("./../static/data.json");

    if(top50.length === 0){
        let top50list: PlaylistInterface[] = []
        for(let i = 2010; i < 2020; i++){
            let thisSongs = songs.filter((song) => song["year"] === i);
            thisSongs = thisSongs.slice(0, 50);
            const playlist: PlaylistInterface = {
                title: i.toString(),
                id: randomId(),
                color1: randomColor(),
                color2: randomColor(),
                songs: thisSongs
            }
            top50list.push(playlist)
        }
        dispatch(setTop50(top50list));
    }

    return <>
        <div id={"home"}>
            <LeftSection></LeftSection>
            <MainBodyHome></MainBodyHome>
        </div>
        <BottomBar></BottomBar>
        <AddPlaylistModal />
    </>;
};



export default Home;
