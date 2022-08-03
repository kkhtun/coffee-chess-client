import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";
import { HOST } from "../../environment/environment";
import Loader from "../../components/Loader/Loader";
import { fireAlert } from "../../helpers/alerts";
function Home() {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const createNewGame = () => {
        axios
            .post(`${HOST}/api/v1/games`, {})
            .then((res) => {
                navigate("/game/" + res.data._id);
            })
            .catch(console.error);
    };

    const joinRandom = () => {
        axios
            .get(`${HOST}/api/v1/games/random`)
            .then(({ data }) => {
                if (!data) {
                    fireAlert(
                        `There are no joinable games at the moment. \n 
                        Please create a new game or try again later`
                    );
                } else {
                    navigate("/game/" + data._id);
                }
            })
            .catch(console.error);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${HOST}/api/v1/games`)
            .then(({ data }) => {
                setGames(data.data);
                setCount(data.count);
                setLoading(false);
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
            <Box style={{ textAlign: "center" }}>
                <Typography style={{ margin: "10px 0px" }} variant="h6">
                    Welcome to Coffee Chess!
                    <br /> {auth.name}
                </Typography>
                <Button
                    onClick={joinRandom}
                    variant="outlined"
                    color="info"
                    sx={{ marginRight: "5px" }}
                >
                    Join Random
                </Button>
                <Button
                    onClick={createNewGame}
                    variant="contained"
                    color="secondary"
                >
                    Create New Game
                </Button>
            </Box>
            <Box
                mt={4}
                sx={{
                    maxWidth: Math.max(360, window.innerWidth - 10),

                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h6">
                    Current Games ({count || 0})
                </Typography>
                <Typography sx={{ fontSize: 12 }} color="text.info" mb={1}>
                    <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                    &nbsp;Inactive games will be removed after a few hours
                </Typography>
                <Loader loading={loading} />
                <Box>
                    {games &&
                        games.map((g) => <GameListItem {...g} key={g._id} />)}
                </Box>
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
        <Card raised={true} style={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    ID:{_id}
                </Typography>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Created At : {createdAt}
                </Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" mt={1}>
                    Players :
                </Typography>
                <Typography variant="body2">
                    {player_one?.name} | {player_two?.name}
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "16px" }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => enterGame(_id)}
                    style={{ marginLeft: "auto" }}
                >
                    Enter Game
                </Button>
            </CardActions>
        </Card>
    );
}
export default Home;
