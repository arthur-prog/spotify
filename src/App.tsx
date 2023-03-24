import React from 'react';
import './index.css';
import {Provider} from "react-redux";
import store from "./store";
import Home from "./Home";
import {ConfigProvider, theme} from "antd";
import {Route, Routes} from "react-router-dom";
import Playlist from "./Playlist";

const App = () => {
    return <>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#1DB954',
                },
            }}
        >
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/playlist/:id" element={<Playlist />}/>
                </Routes>
            </Provider>
        </ConfigProvider>

    </>;
};

export default App;
