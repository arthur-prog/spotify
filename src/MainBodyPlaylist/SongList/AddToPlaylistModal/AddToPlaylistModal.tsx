import {Button, Modal} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './AddToPlaylistModal.css';
import {State} from "../../../store";
import {
    addSongToPlaylist,
    PlaylistInterface,
    setAddToPlaylistModal,
    SongPlaylistInterface
} from "../../../Slices/playlistsSlice";



const AddToPlaylistModal = () => {
    const dispatch = useDispatch();
    const playlists = useSelector((state: State) => state.playlists.items);
    const addToPlaylistModal = useSelector((state: State) => state.playlists.addToPlaylistModal);
    const song = useSelector((state: State) => state.playlists.songAddToPlaylistModal);

    const handleOnClose = () => {
        dispatch(setAddToPlaylistModal(false));
    };

    const handleOnClick = (thisPlaylist: PlaylistInterface) => {
        if(song !== null){
            const songPlaylist: SongPlaylistInterface = {
                playlist: thisPlaylist,
                song: song
            }
            dispatch(addSongToPlaylist(songPlaylist));
            handleOnClose();
        }
    };

    return (
        <Modal
            title="Add to playlist"
            open={addToPlaylistModal}
            okText="Create"
            className="add-playlist-modal"
            onCancel={handleOnClose}
            onOk={() => {}}
            footer={[
            ]}
        >
            {playlists.length !== 1 ?
                playlists.map((playlist: PlaylistInterface) => {
                if(playlist.title !== "Liked Songs")
                    return <div className={"add-to-playlist-modal-title-div"} key={playlist.id} onClick={() => handleOnClick(playlist)}><h2 className={"add-to-playlist-modal-playlist-title"}>{playlist.title}</h2></div>
                return null
            }) : (<h2>No playlists</h2>)
            }
        </Modal>
    );
};

export default AddToPlaylistModal;
