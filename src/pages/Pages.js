import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import { useContext, useEffect } from "react";
// Components
import Login from "./login/Login";
import Game from "./game/Game";
import Home from "./home/Home";

// Auth
import { getAuth } from "firebase/auth";
import { AuthContext } from "../contexts/auth.context";
import app from "../firebase/firebase";

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
    return <Outlet />;
}

function Pages() {
    const { auth, setAuth } = useContext(AuthContext);
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
            } else {
                setAuth({});
            }
        });
    }, [setAuth]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppWrapper />}>
                    <Route
                        path=""
                        element={<ProtectedRoute auth={auth.token} />}
                    >
                        <Route path="" element={<Home />} />
                        <Route path="game" element={<Game />} />
                    </Route>

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
