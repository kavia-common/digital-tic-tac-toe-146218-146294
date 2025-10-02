import React from "react";
import { Theme } from "../theme";
import { Board as BoardType, GameStatus, Player } from "../gameLogic";

type Props = {
  board: BoardType;
  status: GameStatus;
  onCellClick: (index: number) => void;
};

const gradientBackground = `linear-gradient(135deg, rgba(59,130,246,0.10), rgba(249,250,251,1))`;

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  borderRadius: Theme.radii.lg,
  boxShadow: Theme.shadows.soft,
  background: Theme.colors.surface,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  transition: Theme.transitions.base,
  backdropFilter: "saturate(140%) blur(4px)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const statusPillBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: Theme.radii.full,
  padding: "8px 12px",
  fontWeight: 600,
  color: Theme.colors.text,
  background: gradientBackground,
  boxShadow: Theme.shadows.inset,
  transition: Theme.transitions.fast,
};

const statusDot = (color: string): React.CSSProperties => ({
  width: 10,
  height: 10,
  borderRadius: Theme.radii.full,
  backgroundColor: color,
  boxShadow: `0 0 0 2px ${color}22`,
});

const subtleText: React.CSSProperties = {
  color: "#4B5563",
  fontSize: 12,
};

const gridWrapper: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1 / 1",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
};

const cellBase: React.CSSProperties = {
  background: Theme.colors.surface,
  borderRadius: Theme.radii.md,
  border: "1px solid #E5E7EB",
  boxShadow: Theme.shadows.inset,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  transition: Theme.transitions.base,
  color: Theme.colors.text,
};

const cellHover: React.CSSProperties = {
  borderColor: "#D1D5DB",
  transform: "translateY(-1px)",
  boxShadow: Theme.shadows.hover,
};

const cellDisabled: React.CSSProperties = {
  cursor: "not-allowed",
  opacity: 0.6,
  filter: "grayscale(10%)",
};

const markStyle = (mark: Player | null): React.CSSProperties => ({
  fontSize: "clamp(28px, 7vw, 56px)",
  fontWeight: 800,
  letterSpacing: 1,
  color: mark === "X" ? Theme.colors.primary : mark === "O" ? Theme.colors.secondary : Theme.colors.text,
  textShadow: mark ? `0 6px 16px ${mark === "X" ? "#2563EB22" : "#F59E0B22"}` : "none",
  transition: Theme.transitions.base,
});

const toolbarStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: 6,
};

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

const StatusPill: React.FC<{ status: GameStatus }> = ({ status }) => {
  if (status.type === "turn") {
    return (
      <div
        style={{
          ...statusPillBase,
          color: Theme.colors.text,
        }}
        aria-live="polite"
      >
        <span aria-hidden style={statusDot(status.player === "X" ? Theme.colors.primary : Theme.colors.secondary)} />
        <span>
          Turn: <strong style={{ color: status.player === "X" ? Theme.colors.primary : Theme.colors.secondary }}>{status.player}</strong>
        </span>
      </div>
    );
  }

  if (status.type === "win") {
    return (
      <div
        style={{
          ...statusPillBase,
          color: Theme.colors.text,
          boxShadow: Theme.shadows.hover,
        }}
        aria-live="polite"
      >
        <span aria-hidden style={statusDot(status.player === "X" ? Theme.colors.primary : Theme.colors.secondary)} />
        <span>
          Winner:{" "}
          <strong style={{ color: status.player === "X" ? Theme.colors.primary : Theme.colors.secondary }}>{status.player}</strong>
        </span>
      </div>
    );
  }

  return (
    <div style={{ ...statusPillBase }} aria-live="polite">
      <span aria-hidden style={statusDot("#10B981")} />
      <span>Draw</span>
    </div>
  );
};

export const Board: React.FC<Props> = ({ board, status, onCellClick }) => {
  const isOver = status.type === "win" || status.type === "draw";
  const winningSet = status.type === "win" ? new Set(status.line) : null;

  return (
    <section
      role="group"
      aria-label="Tic Tac Toe"
      style={{
        ...containerStyle,
        background: Theme.colors.surface,
      }}
    >
      <div style={headerStyle}>
        <StatusPill status={status} />
        <div style={subtleText}>Ocean Professional Theme</div>
      </div>

      <div style={gridWrapper}>
        {board.map((cell, idx) => {
          const disabled = Boolean(cell) || isOver;
          const isWinningCell = winningSet?.has(idx);

          const bgGradient =
            isWinningCell
              ? `linear-gradient(135deg, ${Theme.colors.secondary}22, ${Theme.colors.primary}15)`
              : Theme.colors.surface;

        const finalStyle: React.CSSProperties = {
            ...cellBase,
            background: bgGradient,
            borderColor: isWinningCell ? `${Theme.colors.primary}44` : "#E5E7EB",
          };

          return (
            <button
              key={idx}
              type="button"
              aria-label={`Cell ${idx + 1}${cell ? ` containing ${cell}` : ""}`}
              onClick={() => !disabled && onCellClick(idx)}
              disabled={disabled}
              style={{
                ...finalStyle,
                ...(disabled ? cellDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!disabled) Object.assign(e.currentTarget.style, cellHover);
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  Object.assign(e.currentTarget.style, {
                    transform: "translateY(0)",
                    boxShadow: Theme.shadows.inset,
                    borderColor: finalStyle.borderColor as string,
                  });
                }
              }}
            >
              <span aria-hidden style={markStyle(cell)}>{cell ? cell : ""}</span>
            </button>
          );
        })}
      </div>

      <div style={toolbarStyle}>
        {/* Reset button is handled in parent using a ref/callback */}
      </div>

      <span style={srOnly} role="status" aria-live="polite">
        {status.type === "turn" && `Turn ${status.player}`}
        {status.type === "win" && `Winner ${status.player}`}
        {status.type === "draw" && `Game draw`}
      </span>
    </section>
  );
};
