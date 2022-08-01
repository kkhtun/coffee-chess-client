import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";
import { HOST } from "../../environment/environment";
function Home() {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [count, setCount] = useState(0);

    const startGame = () => {
        axios
            .post(`${HOST}/api/v1/games`, {})
            .then((res) => {
                navigate("/game/" + res.data._id);
            })
            .catch(console.error);
    };

    useEffect(() => {
        axios
            .get(`${HOST}/api/v1/games`)
            .then(({ data }) => {
                setGames(data.data);
                setCount(data.count);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (auth && socket) {
            socket.emit("leave:all", { name: auth.name });
        }
    }, [socket, auth]);

    return (
        <>
            <Typography style={{ margin: "10px 0px" }} variant="h6">
                Welcome {auth.name}!<br /> Join a Game or Create a new one.
            </Typography>
            <Button onClick={startGame} variant="outlined">
                Create New Game
            </Button>
            <Box
                sx={{
                    maxWidth: 360,
                    margin: "15px 0px",
                    bgcolor: "background.paper",
                }}
            >
                <Typography>Current Games ({count || 0})</Typography>
                <List>
                    {games && games.map((g) => <GameListItem {...g} />)}
                </List>
            </Box>
        </>
    );
}

function GameListItem({ _id, player_one, player_two, createdAt }) {
    const navigate = useNavigate();
    const enterGame = (_id) => {
        navigate("/game/" + _id);
    };
    return (
        <>
            <ListItem>
                <ListItemText
                    primary={`Game ID : ${_id}`}
                    secondary={
                        <>
                            <Typography>Created : {createdAt}</Typography>
                            <Typography>P1 : {player_one?.name}</Typography>
                            <Typography>P2 : {player_two?.name}</Typography>
                            <ListItemButton
                                style={{
                                    display: "inline-block",
                                    marginTop: "5px",
                                }}
                                onClick={() => enterGame(_id)}
                                alignItems="center"
                            >
                                Enter
                            </ListItemButton>
                        </>
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
}
export default Home;
