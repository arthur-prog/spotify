import React, {useState} from 'react';
import './SongList.css';
import {
    PlaylistInterface, setAddToPlaylistModal,
    setCurrentSong,
    setSongAddToPlaylistModal,
    SongInterface,
    SongPlaylistInterface
} from "../../Slices/playlistsSlice";
import {useDispatch} from "react-redux";
import {Input, Select, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import HeartButton from "../../HeartButton";
import {secToMinSec} from "../../utils";

const SongList = (playlist: PlaylistInterface) => {
    const dispatch = useDispatch();

    let songs: SongInterface[] = playlist.songs;
    const [searchText, setSearchText] = useState("");
    const [orderText, setOrderText] = useState("");

    function handleOnClick( song: SongInterface){
        const songPlaylist: SongPlaylistInterface = {
            playlist: playlist,
            song: song
        }
        dispatch(setCurrentSong(songPlaylist));
    }

    const handleRightClick = (e: React.MouseEvent, song: SongInterface) => {
        e.preventDefault();
        dispatch(setAddToPlaylistModal(true));
        dispatch(setSongAddToPlaylistModal(song));
    }

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const songSearched = (text: string) => {
        return songs.filter((song: SongInterface) =>
            song.title.startsWith(text) ||
            song.artist.startsWith(text) ||
            song.genre.startsWith(text)
        )
    }

    const handleOnSelectChange = (value: string) => {
        setOrderText(value);
    }

    const songOrdered = (text: string, thisSongs: SongInterface[]) => {
        let sortedSongs: SongInterface[] = [...thisSongs];
        switch (text){
            case "title":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title)
                        return 1;
                    return 0;
                });
            case "artist":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.artist < b.artist)
                        return -1;
                    if (a.artist > b.artist)
                        return 1;
                    return 0;
                });
            case "genre":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.genre < b.genre)
                        return -1;
                    if (a.genre > b.genre)
                        return 1;
                    return 0;
                });
            case "year":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.year < b.year)
                        return -1;
                    if (a.year > b.year)
                        return 1;
                    return 0;
                });
            case "popularity":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.popularity < b.popularity)
                        return -1;
                    if (a.popularity > b.popularity)
                        return 1;
                    return 0;
                });
            case "duration":
                return sortedSongs.sort(function compare(a, b) {
                    if (a.duration < b.duration)
                        return -1;
                    if (a.duration > b.duration)
                        return 1;
                    return 0;
                });
        }
        return sortedSongs
    }

    const getSongs = (searchedText: string, orderedText: string) => {
        let songs1 = songs;
        if(searchedText !== ""){
            songs1 = songSearched(searchedText)
        }
        if(orderedText !== ""){
            songs1 = songOrdered(orderedText, songs1)
        }
        return songs1
    }

    const columns: ColumnsType<SongInterface> = [
        {
            width: "43px",
            key: "first"
        },
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: "10px",
            render: (text, song, index) => index+1,
        },
        {
            title: '',
            key: 'heart',
            width: "10px",
            render: (text, song) => <HeartButton songTitle={song.title} songArtist={song.artist} size={13}/>
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
            width: '437px'
        },
        {
            title: 'YEAR',
            dataIndex: 'year',
            key: 'year',
            width: '138px'
        },
        {
            title: 'GENRE',
            dataIndex: 'genre',
            key: 'genre',
            width: '692px'
        },
        {
            title: 'POPULARITY',
            dataIndex: 'popularity',
            key: 'popularity',
            width: '83px'
        },
        {
            title: 'DURATION',
            dataIndex: 'duration',
            key: 'duration',
            width: '60px',
            render: duration => (secToMinSec(duration))
        },
        {
            width: "15px",
            key: "last"
        }
    ];

    const options = [
        {
            value: 'title',
            label: 'Title',
        },
        {
            value: 'artist',
            label: 'Artist',
        },
        {
            value: 'genre',
            label: 'Genre',
        },
        {
            value: 'year',
            label: 'Year',
        },
        {
            value: 'popularity',
            label: 'Popularity',
        },
        {
            value: 'duration',
            label: 'Duration',
        },

    ];

    return <div className={"song-list"}>
        <div className={"song-list-header-div"}>
            <Input onChange={(e) => handleOnInputChange(e)} className={"song-list-input"}></Input>
            <Select
                className={"song-list-select"}
                onChange={(value) => handleOnSelectChange(value)}
                options={options}
            ></Select>
        </div>
        { getSongs(searchText, orderText).length !== 0 ?
            (<Table
                bordered={false}
                pagination={false}
                columns={columns}
                rowKey={"id"}
                dataSource={getSongs(searchText, orderText)}
                onRow={(song: SongInterface) => {
                    return {
                        onClick: () => handleOnClick(song),
                        onContextMenu: (e) => handleRightClick(e, song)
                    };
                }}
            />) : (<div className={"song-list-no-songs"}><h2>No songs</h2></div>)
        }
        </div>;
};


export default SongList;
