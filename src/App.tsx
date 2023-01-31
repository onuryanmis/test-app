import React from 'react';
import Homepage from "./page/Homepage/Homepage";
import {Navigate, Route, Routes} from "react-router-dom";
import Room from "./page/Room/Room";
import {SocketContextProvider} from "./context/SocketContext";

function App() {
    return (
        <SocketContextProvider>
            <div id="app-wrapper">
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/room/:uuid" element={<Room/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </SocketContextProvider>
    );
}

export default App;
