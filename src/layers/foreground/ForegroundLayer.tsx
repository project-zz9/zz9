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
  alignItems: "center",
  paddingBottom: "25%",
  pointerEvents: "none",
};
const content: React.CSSProperties = {
  backgroundColor: "yellow",
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
