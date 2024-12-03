import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { useContext } from "react";


 const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {  // giving the backend url 
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id,
                },
            });
            setSocket(socket);  // set the socket state to the connection
            // socket.on() event is used to listen the events. It can be used to both clent and server side.
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // for performance purpose we use this to clean up the function
            return () => {
                socket.close();  // this will close the socket connection when the component unmounts
            }
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}