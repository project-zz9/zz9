import type { ReactNode } from "react";

interface IForegroundLayerProps {
  children: ReactNode;
}

const root: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  pointerEvents: "none",
};

const content: React.CSSProperties = {
  backgroundColor: "#5FF0F050",
  padding: "10px",
  borderRadius: 10,
  pointerEvents: "all",
};

function ForegroundLayer({ children }: IForegroundLayerProps) {
  return (
    <div style={root}>
      <div style={content}>{children}</div>
    </div>
  );
}

export default ForegroundLayer;
