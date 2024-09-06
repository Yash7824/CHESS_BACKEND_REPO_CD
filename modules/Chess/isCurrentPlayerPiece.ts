const isCurrentPlayerPiece = (piece: string, isWhite: boolean): boolean => {
    if (!piece) {
      return false; // Empty square
    }
  
    // For the white player, the pieces are represented by uppercase letters.
    if (isWhite) {
      return piece === piece.toUpperCase();
    }
    
    // For the black player, the pieces are represented by lowercase letters.
    return piece === piece.toLowerCase();
  }

  export default isCurrentPlayerPiece;