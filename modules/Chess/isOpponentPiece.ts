export function isOpponentPiece(piece: string, isWhite: boolean) {
    if (!piece) return false; // No piece to capture
    const targetIsWhite = piece === piece.toUpperCase();
    return isWhite !== targetIsWhite;
}