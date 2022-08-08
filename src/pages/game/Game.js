import { Chess } from "chess.js";
import { useContext, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { SocketContext } from "../../contexts/socket.context";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { fireAlert } from "../../helpers/alerts";
import { checkGameEndings, getPlayerColor } from "../../helpers/game";

function Game() {
    const boardWidth = Math.min(500, window.innerWidth) - 40; // -20 as buffer;
    const { gameId } = useParams();

    const [game, setGame] = useState(new Chess());
    const [playerOne, setPlayerOne] = useState(null);
    const [playerTwo, setPlayerTwo] = useState(null);
    const [color, setColor] = useState(""); // this is your color
    const [orientation, setOrientation] = useState("w"); // vertically you will be playing from bottom

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
            pgn: game.pgn(),
            containsGameOverMessage: game.game_over()
                ? checkGameEndings(game, game.turn())
                : false,
        });
        return true;
    }

    useEffect(() => {
        if (gameId && auth.token && socket) {
            socket.on("joined:game", (joinedGame) => {
                const { pgn, player_one, player_two } = joinedGame;
                setTimeout(() => {
                    safeGameMutate((game) => {
                        game.load_pgn(pgn);
                        if (game.game_over())
                            return fireAlert(
                                checkGameEndings(game, game.turn())
                            );
                    });
                }, 300);
                setPlayerOne(player_one);
                setPlayerTwo(player_two);
                const playerColor = getPlayerColor(
                    player_one?.email,
                    player_two?.email,
                    auth.email
                );
                setColor(playerColor);
                setOrientation(!playerColor || playerColor === "w" ? "w" : "b");
            });
            socket.emit("join:game", { gameId });

            socket.on("alert:game", ({ message }) => {
                console.log(message);
                fireAlert(message.replace(auth.name, "You"));
            });

            socket.on("moved:piece", ({ pgn }) => {
                safeGameMutate((game) => {
                    game.load_pgn(pgn);
                });
            });
            socket.on("moved:invalid", ({ pgn }) => {
                safeGameMutate((game) => {
                    game.load_pgn(pgn);
                });
            });
        }
        return () => {};
    }, [socket, gameId, auth]);

    return (
        <Box
            style={{
                margin: "10px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <PlayerCard
                width={boardWidth}
                player={orientation === "w" ? playerTwo : playerOne}
                contentStyle={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            />
            <Chessboard
                id="chessboard"
                boardOrientation={orientation === "w" ? "white" : "black"}
                boardWidth={boardWidth}
                position={game.fen()}
                onPieceDrop={onDrop}
            />
            <PlayerCard
                width={boardWidth}
                player={orientation === "w" ? playerOne : playerTwo}
                contentStyle={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                turn={game.turn()}
            />
        </Box>
    );
}
export default Game;

function PlayerCard({ width, player, contentStyle, turn }) {
    return (
        <Card style={{ width }}>
            <CardContent style={{ ...contentStyle }}>
                <Typography>{player ? player.name : ""}</Typography>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    {turn && (
                        <Chip
                            label={
                                turn === "w"
                                    ? "White is to move"
                                    : "Black is to move"
                            }
                            variant={turn === "w" ? "contained" : "outlined"}
                            size="small"
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
