import { Chess } from "chess.js";
import { useContext, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";

function Game() {
    const boardWidth = Math.min(window.innerHeight, window.innerWidth) - 100; // -20 as buffer;
    const { gameId } = useParams();

    const [game, setGame] = useState(new Chess());
    const [playerOne, setPlayerOne] = useState(null);
    const [playerTwo, setPlayerTwo] = useState(null);
    const [color, setColor] = useState(""); // this is your color

    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    function onDrop(sourceSquare, targetSquare, piece) {
        if (!socket && !game) return false;
        if (game.turn() !== color) return false;
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to a queen for example simplicity
            });
        });
        if (move === null) {
            return false; // illegal move
        }
        socket.emit("move:piece", {
            gameId,
            move,
            fen: game.fen(),
            gameOver: game.game_over(),
        });
        return true;
    }

    useEffect(() => {
        if (gameId && auth.token && socket) {
            socket.on("joined:game", (joinedGame) => {
                const { fen, player_one, player_two, color } = joinedGame;
                setTimeout(() => {
                    safeGameMutate((game) => {
                        game.load(fen);
                    });
                }, 300);
                setPlayerOne(player_one);
                setPlayerTwo(player_two);
                setColor(color);
            });
            socket.emit("join:game", { gameId });

            socket.on("alert:game", ({ message }) => {
                if (message.includes("Checkmate")) {
                    return window.alert(message);
                }
            });

            socket.on("moved:piece", ({ move, fen }) => {
                safeGameMutate((game) => {
                    game.load(fen);
                });
            });
            socket.on("moved:invalid", ({ move, fen }) => {
                safeGameMutate((game) => {
                    game.load(fen);
                });
            });
        }
        return () => {};
    }, [socket, gameId, auth]);

    useEffect(() => {
        if (socket && auth.token) {
        }
    }, [socket, auth]);

    return (
        <div>
            <span>
                Player One: {playerOne ? playerOne.name : ""} <br />
                Player Two: {playerTwo ? playerTwo.name : ""} <br />
                Turn : {game.turn()} | {color ? `Your Color is ${color}` : ""}
            </span>
            <Chessboard
                id="chessboard"
                boardOrientation={!color || color === "w" ? "white" : "black"}
                boardWidth={boardWidth}
                position={game.fen()}
                onPieceDrop={onDrop}
            />
        </div>
    );
}
export default Game;
