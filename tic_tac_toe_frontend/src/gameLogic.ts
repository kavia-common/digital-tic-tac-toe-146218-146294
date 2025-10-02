export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[]; // length 9
export type GameStatus =
  | { type: "turn"; player: Player }
  | { type: "win"; player: Player; line: number[] }
  | { type: "draw" };

export const createEmptyBoard = (): Board => Array<Cell>(9).fill(null);

export const winningLines: number[][] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board: Board): { player: Player; line: number[] } | null => {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a] as Player, line };
    }
  }
  return null;
};

export const isDraw = (board: Board): boolean => board.every((c) => c !== null);

export const getNextPlayer = (board: Board): Player => {
  const xCount = board.filter((c) => c === "X").length;
  const oCount = board.filter((c) => c === "O").length;
  return xCount === oCount ? "X" : "O";
};

export const getGameStatus = (board: Board): GameStatus => {
  const win = checkWinner(board);
  if (win) {
    return { type: "win", player: win.player, line: win.line };
  }
  if (isDraw(board)) {
    return { type: "draw" };
  }
  return { type: "turn", player: getNextPlayer(board) };
};
