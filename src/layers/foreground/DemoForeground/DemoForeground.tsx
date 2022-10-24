import ForegroundLayer from "../ForegroundLayer";

interface IDemoForegroundProps {
  title: string;
  body?: string;
  color?: string;
}

function DemoForeground({ title, body, color }: IDemoForegroundProps) {
  return (
    <ForegroundLayer>
      <div style={color ? { backgroundColor: color } : {}}>
        <h1>{title}</h1>
        <pre>{body}</pre>
      </div>
    </ForegroundLayer>
  );
}

export default DemoForeground;
