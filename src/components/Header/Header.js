import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase";
function Header({ setDrawerOpen }) {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = async (e) => {
        setAnchorEl(null);
        if (socket) socket.disconnect();
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
                        onClick={() => setDrawerOpen((p) => !p)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: "inline" }}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            Coffee Chess
                        </Typography>
                    </Box>
                    {auth.token ? (
                        <Box>
                            <Tooltip title={auth.name || auth.email}>
                                <IconButton
                                    onClick={(e) => setAnchorEl(e.target)}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={auth.email}
                                        src={auth.photoURL}
                                    />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleLogout}>
                                    &nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
