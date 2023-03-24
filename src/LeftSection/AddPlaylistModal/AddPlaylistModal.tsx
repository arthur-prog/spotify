import {Button, Input, Modal} from 'antd';
import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import './AddPlaylistModal.css';
import {State} from "../../store";
import {PlaylistInterface, setAddPlaylistModal, setPlaylists} from "../../Slices/playlistsSlice";
import {randomId} from "../../utils";
import randomColor from "randomcolor";



const AddPlaylistModal = () => {
    const dispatch = useDispatch();
    const addPlaylistModal = useSelector((state: State) => state.playlists.addPlaylistModal);
    const playlist = useSelector((state: State) => state.playlists.items);
    const [playlistName, setPlaylistName] = useState<string>("");

    const handleOnClose = () => {
        dispatch(setAddPlaylistModal(false));
    };

    const handleOnSave = () => {
        if (playlistName !== "") {
            const newPlaylist: PlaylistInterface = {
                id: randomId(),
                title: playlistName,
                songs: [],
                color1: randomColor(),
                color2: randomColor()
            }
            dispatch(setPlaylists([...playlist, newPlaylist]));
            dispatch(setAddPlaylistModal(false));
            setPlaylistName("");
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(e.target.value);
    };

    return (
        <Modal
            title="Create playlist"
            open={addPlaylistModal}
            onCancel={handleOnClose}
            className="add-playlist-modal"
            footer={[
                <Button key="submit" type="primary" onClick={handleOnSave} className={"add-playlist-modal-button"}>
                    Create
                </Button>
            ]}
        >
            <Input className={"add-playlist-modal-input"} value={playlistName} onChange={handleOnChange} />
        </Modal>
    );
};

export default AddPlaylistModal;
