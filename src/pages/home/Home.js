import axios from "axios";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";
import { HOST } from "../../environment/environment";
import app from "../../firebase/firebase";
function Home() {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [count, setCount] = useState(0);

    const handleLogout = (e) => {
        // just a quick workaround for devflow, need to implement more elegant way
        getAuth(app).signOut();
    };

    const startGame = () => {
        axios
            .post(`${HOST}/api/v1/games`, {})
            .then((res) => {
                navigate("/game/" + res.data._id);
            })
            .catch(console.error);
    };

    const enterGame = (_id) => {
        navigate("/game/" + _id);
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
        <div>
            Welcome {auth.name}! this is home page
            <button onClick={handleLogout}>Sign Out</button>
            <button onClick={startGame}>Create New Game</button>
            <h4>Games {count || 0}</h4>
            <ul>
                {games &&
                    games.map((g) => (
                        <li key={g._id}>
                            <button onClick={() => enterGame(g._id)}>
                                GameID : {g._id} <br />
                                Created At : {g.createdAt} <br />
                                Players : {g.player_one?.name} |
                                {g.player_two?.name}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default Home;
