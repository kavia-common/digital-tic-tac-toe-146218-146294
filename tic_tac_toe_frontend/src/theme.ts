export const Theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // blue
    secondary: "#F59E0B", // amber
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    shadow: "rgba(17,24,39,0.08)",
  },
  // Shadows and radii to be consistent
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  shadows: {
    soft: "0 10px 20px rgba(17,24,39,0.08), 0 2px 6px rgba(17,24,39,0.05)",
    hover: "0 14px 28px rgba(17,24,39,0.12), 0 10px 10px rgba(17,24,39,0.06)",
    inset: "inset 0 1px 2px rgba(17,24,39,0.06)",
  },
  transitions: {
    base: "all 200ms ease",
    fast: "all 150ms ease",
    slow: "all 300ms ease",
  },
};
