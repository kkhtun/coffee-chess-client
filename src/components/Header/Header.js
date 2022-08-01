import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase";
import { SocketContext } from "../../contexts/socket.context";
import { useNavigate } from "react-router-dom";
function Header() {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Coffee Chess
                    </Typography>
                    {auth.token ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <></>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
