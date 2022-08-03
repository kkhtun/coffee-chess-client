import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import Drawer from "../components/Drawer/Drawer";
import Footer from "../components/Footer/Footer";
import About from "./about/About";

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
    const { pathname } = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <div>
            <Header setDrawerOpen={setDrawerOpen} />
            <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            <Container
                maxWidth={pathname.includes("game") ? "md" : "xs"}
                style={{ minHeight: window.innerHeight - 200 }}
            >
                <Outlet />
            </Container>
            <Footer />
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
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Pages;
