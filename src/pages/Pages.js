import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { HOST } from "../environment/environment";
// Components
import Login from "./login/Login";
import Game from "./game/Game";
import Home from "./home/Home";

// Auth
import { getAuth } from "firebase/auth";
import { AuthContext } from "../contexts/auth.context";
import app from "../firebase/firebase";

// Socket
import { SocketContext } from "../contexts/socket.context";
import Header from "../components/Header/Header";
import { Container } from "@mui/material";

function ProtectedRoute({ auth }) {
    if (!auth) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

function InverseProtectedRoute({ auth }) {
    if (auth) return <Navigate to="/" replace />;
    return <Outlet />;
}

function AppWrapper() {
    return (
        <div>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

function Pages() {
    const { auth, setAuth } = useContext(AuthContext);
    const { setSocket } = useContext(SocketContext);
    useEffect(() => {
        getAuth(app).onIdTokenChanged((user) => {
            const { displayName, email, accessToken } = user || {};
            if (accessToken) {
                setAuth({
                    token: accessToken,
                    email,
                    name: displayName || "Anonymous",
                });
                console.log("Previous token found on storage, set to context");
                const socket = io(HOST, {
                    auth: {
                        token: accessToken,
                    },
                })
                    .on("connection", console.log)
                    .once("connect_error", console.error);
                setSocket(socket);
            } else {
                setAuth({});
            }
        });
    }, [setAuth, setSocket]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppWrapper />}>
                    <Route
                        path=""
                        element={<ProtectedRoute auth={auth.token} />}
                    >
                        <Route path="" element={<Home />} />
                    </Route>
                    <Route path="game/:gameId" element={<Game />} />

                    <Route
                        path=""
                        element={<InverseProtectedRoute auth={auth.token} />}
                    >
                        <Route path="login" element={<Login />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Pages;
