import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../contexts/socket.context";
import { HOST } from "../../environment/environment";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase";
import { AuthContext } from "../../contexts/auth.context";

function Drawer({ drawerOpen, setDrawerOpen }) {
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const startGame = () => {
        axios
            .post(`${HOST}/api/v1/games`, {})
            .then((res) => {
                navigate("/game/" + res.data._id);
            })
            .catch(console.error);
    };

    const handleLogout = async (e) => {
        // just a quick workaround for logout flow, need to implement more elegant way
        if (socket) {
            socket.disconnect();
        }
        getAuth(app)
            .signOut()
            .then(() => {
                navigate("/login");
            });
    };
    return (
        <SwipeableDrawer
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
        >
            <Box
                sx={{
                    width: 250,
                }}
                role="presentation"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
            >
                <List>
                    {auth.token && (
                        <ListItem key="New Game" disablePadding>
                            <ListItemButton onClick={startGame}>
                                <ListItemText primary="New Game" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {auth.token && (
                        <ListItem key="Home" disablePadding>
                            <ListItemButton onClick={() => navigate("/")}>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {auth.token && (
                        <ListItem key="About" disablePadding>
                            <ListItemButton onClick={() => navigate("/about")}>
                                <ListItemText primary="About" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {auth.token && (
                        <ListItem key="Logout" disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {!auth.token && (
                        <ListItem key="Login" disablePadding>
                            <ListItemButton onClick={() => navigate("/login")}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

export default Drawer;
