export function checkGameEndings(game, currentTurn) {
    const prevTurnColor = currentTurn === "w" ? "Black" : "White";
    if (game.in_checkmate()) {
        return `Checkmate! ${prevTurnColor} has won the game`;
    } else if (game.in_stalemate()) {
        return `The game ends in stalemate!`;
    } else if (game.in_draw()) {
        return `The game ends in a draw!`;
    } else if (game.in_threefold_repetition()) {
        return `The game ends in threefold repeatition! The current board position occurred three or more times`;
    } else if (game.insufficient_material()) {
        return `The game ends in insufficient material! The game is immediately declared a draw if there is no way to end the game in checkmate.`;
    } else {
        return `Game Over!`;
    }
}

// current cannot check DB ID so email will be used temporarily
export function getPlayerColor(playerOneEmail, playerTwoEmail, currentEmail) {
    if (currentEmail === playerOneEmail) {
        return "w";
    } else if (currentEmail === playerTwoEmail) {
        return "b";
    } else {
        return "";
    }
}
