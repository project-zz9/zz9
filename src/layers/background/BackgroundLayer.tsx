import type { ReactNode } from "react";

interface IBackgroundLayerProps {
  children: ReactNode;
}

const root: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  inset: 0,
  zIndex: -1,
};

function BackgroundLayer({ children }: IBackgroundLayerProps) {
  return <div style={root}>{children}</div>;
}

export default BackgroundLayer;
