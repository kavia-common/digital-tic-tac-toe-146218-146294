import React, { useCallback, useMemo, useState } from "react";
import { AbsoluteFill } from "remotion";
import { Board } from "./Board";
import { Board as BoardType, GameStatus, Player, createEmptyBoard, getGameStatus } from "../gameLogic";
import { Theme } from "../theme";

const pageStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
  width: "100%",
  background: `linear-gradient(180deg, rgba(37,99,235,0.08), rgba(249,250,251,1))`,
  color: Theme.colors.text,
};

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 720,
  margin: "0 auto",
  padding: "min(6vw, 32px)",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const titleStyle: React.CSSProperties = {
  fontWeight: 800,
  letterSpacing: 0.3,
  backgroundImage: `linear-gradient(90deg, ${Theme.colors.primary}, ${Theme.colors.secondary})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textAlign: "center" as const,
  fontSize: "clamp(22px, 4.4vw, 32px)",
};

const toolbarStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap",
};

const buttonBase: React.CSSProperties = {
  appearance: "none",
  border: "none",
  outline: "none",
  borderRadius: 9999,
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
  transition: Theme.transitions.base,
  boxShadow: Theme.shadows.soft,
  color: "#ffffff",
  background: Theme.colors.primary,
};

const buttonSecondary: React.CSSProperties = {
  background: Theme.colors.secondary,
  color: "#1F2937",
};

const buttonHover = (bg: string): React.CSSProperties => ({
  transform: "translateY(-1px)",
  boxShadow: Theme.shadows.hover,
  filter: "saturate(110%)",
  background: bg,
});

export const Game: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(() => createEmptyBoard());
  const status: GameStatus = useMemo(() => getGameStatus(board), [board]);

  const onCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null) return;
      if (status.type === "win" || status.type === "draw") return;
      const next: Player = status.type === "turn" ? status.player : "X";
      const newBoard = [...board];
      newBoard[index] = next;
      setBoard(newBoard);
    },
    [board, status]
  );

  const reset = useCallback(() => {
    setBoard(createEmptyBoard());
  }, []);

  const primaryHover = buttonHover(Theme.colors.primary);
  const secondaryHover = buttonHover(Theme.colors.secondary);

  return (
    <AbsoluteFill style={pageStyle}>
      <div style={wrapperStyle}>
        <h1 style={titleStyle}>Tic Tac Toe</h1>
        <Board board={board} status={status} onCellClick={onCellClick} />
        <div style={toolbarStyle}>
          <button
            type="button"
            aria-label="Reset game"
            title="Reset game"
            onClick={reset}
            style={buttonBase}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, primaryHover)}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0)",
                boxShadow: Theme.shadows.soft,
                background: Theme.colors.primary,
              })
            }
          >
            Reset
          </button>
          <button
            type="button"
            aria-label="New game"
            title="Start a new game"
            onClick={reset}
            style={{ ...buttonBase, ...buttonSecondary }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, secondaryHover)}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0)",
                boxShadow: Theme.shadows.soft,
                background: Theme.colors.secondary,
                color: "#1F2937",
              })
            }
          >
            New Game
          </button>
        </div>
      </div>
    </AbsoluteFill>
  );
};
