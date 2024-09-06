const findKingPosition = (board: string[][], isWhite: boolean) => {
    const kingSymbol = isWhite ? 'K' : 'k';
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === kingSymbol) {
                return { row, col };
            }
        }
    }
    return null;
};

export default findKingPosition;