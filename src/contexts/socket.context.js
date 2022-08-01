import React, { createContext, useState } from "react";

const SocketContext = createContext({});
function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState({});
    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContextProvider, SocketContext };
