import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

function Game() {
    const boardWidth = Math.min(window.innerHeight, window.innerWidth) - 20; // -20 as buffer;

    const [game, setGame] = useState(new Chess());

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    // function makeRandomMove() {
    //     const possibleMoves = game.moves();
    //     if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
    //         return; // exit if the game is over
    //     const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    //     safeGameMutate((game) => {
    //         game.move(possibleMoves[randomIndex]);
    //     });
    // }

    function onDrop(sourceSquare, targetSquare, piece) {
        let move = null;
        console.log(sourceSquare, targetSquare, piece);
        safeGameMutate((game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to a queen for example simplicity
            });
        });
        if (move === null) return false; // illegal move
        return true;
    }
    return (
        <Chessboard
            id="chessboard"
            boardOrientation="black"
            boardWidth={boardWidth}
            position={game.fen()}
            onPieceDrop={onDrop}
        />
    );
}
export default Game;
