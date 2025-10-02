import React from "react";
import { AbsoluteFill } from "remotion";
import { Game } from "./components/Game";
import { Theme } from "./theme";

// PUBLIC_INTERFACE
export const TicTacToeComp: React.FC = () => {
  /**
   * This composition renders an interactive Tic Tac Toe board inside Remotion Studio.
   * It uses the "Ocean Professional" theme for styling with a modern, responsive UI.
   * No backend is required. Users can:
   *  - Take turns placing X and O
   *  - See the status: Turn, Winner, or Draw
   *  - Reset the game
   *
   * Returns
   *  React.ReactElement rendered into a Remotion Composition.
   */
  return (
    <AbsoluteFill style={{ backgroundColor: Theme.colors.background }}>
      <Game />
    </AbsoluteFill>
  );
};
