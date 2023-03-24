import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer, {PlaylistInterface, SongInterface, SongPlaylistInterface} from './Slices/playlistsSlice';

export interface State {
    playlists: {
        items: PlaylistInterface[],
        top50: PlaylistInterface[],
        currentSong: SongPlaylistInterface,
        addPlaylistModal: boolean
        addToPlaylistModal: boolean
        songAddToPlaylistModal: SongInterface | null
    };
}

export default configureStore({
    reducer: {
        playlists: playlistsReducer,
    },
});
