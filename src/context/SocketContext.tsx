import React, {createContext} from 'react';
import io from "socket.io-client";

export const socket = io(':3001', {transports: ['websocket']});
export const SocketContext = createContext(socket);

type SocketContextProps = {
    children: JSX.Element
}

export const SocketContextProvider = ({children}: SocketContextProps) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}