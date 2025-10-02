import React from "react";
import { Theme } from "../theme";

type IconProps = {
  size?: number | string;
  color?: string;
  title?: string;
  style?: React.CSSProperties;
};

/**
 * Two scalable, accessible SVG chess icons adapted for simple, solid display:
 * - Knight: used for player "X" with primary color
 * - Queen: used for player "O" with secondary color
 *
 * Icons are sized using the parent container's font-size by default (1em),
 * which makes them responsive to markStyle font sizing in the board cells.
 */

// PUBLIC_INTERFACE
export const KnightIcon: React.FC<IconProps> = ({
  size = "1em",
  color = Theme.colors.primary,
  title = "Knight",
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      focusable="false"
      style={style}
    >
      <title>{title}</title>
      {/* Simple, bold knight silhouette to be legible at small sizes */}
      <path
        fill={color}
        d="M50 52H14c-1.657 0-3 1.343-3 3v3h42v-3c0-1.657-1.343-3-3-3ZM45 48H19c0-7.732 6.268-14 14-14s14 6.268 14 14Zm-8.5-20.5c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5ZM38 24c0-6-4-12-12-12-2 0-3.5.5-5 1l1-5c6-2 12-1 16 2 4 3 6 7 6 12 0 6-3 10-7 12l-2-4c2-1 3-3 3-6Z"
      />
    </svg>
  );
};

// PUBLIC_INTERFACE
export const QueenIcon: React.FC<IconProps> = ({
  size = "1em",
  color = Theme.colors.secondary,
  title = "Queen",
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      focusable="false"
      style={style}
    >
      <title>{title}</title>
      {/* Simplified queen crown + base, solid shape for clarity */}
      <path
        fill={color}
        d="M12 52c-1.657 0-3 1.343-3 3v3h46v-3c0-1.657-1.343-3-3-3H12Zm38-6H14l6-20 8 8 4-14 4 14 8-8 6 20Zm-27-26a4 4 0 1 1-8.001-.001A4 4 0 0 1 23 20Zm13-6a4 4 0 1 1-8.001-.001A4 4 0 0 1 36 14Zm15 6a4 4 0 1 1-8.001-.001A4 4 0 0 1 51 20Z"
      />
    </svg>
  );
};
