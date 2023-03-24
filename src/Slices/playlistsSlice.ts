import { createSlice } from '@reduxjs/toolkit';

export interface PlaylistInterface {
    id: string;
    title: string,
    songs: SongInterface[],
    color1: string,
    color2: string,
}

export interface SongInterface {

    id: string;
    title: string,
    artist: string,
    genre: string,
    year: number,
    duration: number,
    popularity: number
}

export interface SongPlaylistInterface {
    song: SongInterface,
    playlist: PlaylistInterface
}

const playlistLikedSongs: PlaylistInterface = {
    id: "liked-songs",
    title : "Liked Songs",
    songs: [],
    color1: "#4000F4",
    color2: "#C0ECD7"
}


export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        items: [playlistLikedSongs,],
        top50: [],
        currentSong: null,
        addPlaylistModal: false,
        addToPlaylistModal: false,
        songAddToPlaylistModal: null
    },
    reducers: {
        setPlaylists: (state: {items: PlaylistInterface[]}, action: { payload: PlaylistInterface[] }) => {
            state.items = action.payload;
        },
        setTop50: (state: {top50: PlaylistInterface[]}, action: { payload: PlaylistInterface[] }) => {
            state.top50 = action.payload;
        },
        setCurrentSong: (state: {currentSong: SongPlaylistInterface | null}, action: { payload: SongPlaylistInterface }) => {
            state.currentSong = action.payload;
        },
        addSongToPlaylist: (state: { items: PlaylistInterface[] }, action: { payload: SongPlaylistInterface }) => {
            const playlists = state.items.find(playlist => playlist.title === action.payload.playlist.title);
            if(playlists){
                playlists.songs.push(action.payload.song)
            }
        },
        setAddPlaylistModal: (state: {addPlaylistModal: boolean}, action: { payload: boolean }) => {
            state.addPlaylistModal = action.payload;
        },
        setAddToPlaylistModal: (state: {addToPlaylistModal: boolean}, action: { payload: boolean }) => {
            state.addToPlaylistModal = action.payload;
        },
        setSongAddToPlaylistModal: (state: {songAddToPlaylistModal: SongInterface | null}, action: { payload: SongInterface | null }) => {
            state.songAddToPlaylistModal = action.payload;
        },
    },
});

export const { setPlaylists, setTop50, setCurrentSong, setAddPlaylistModal, setSongAddToPlaylistModal, setAddToPlaylistModal, addSongToPlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
