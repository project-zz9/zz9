import { Link } from "react-router-dom";
import { pages } from "~/pages";
import ForegroundLayer from "../ForegroundLayer";

interface IDemoForegroundProps {
  title: string;
  body?: string;
  color?: string;
}

function DemoForeground({ title, body, color }: IDemoForegroundProps) {
  return (
    <ForegroundLayer>
      <div>
        <h1>{title}</h1>
        <pre>{body}</pre>
        {pages.map(({ path }) => (
          <h2 key={path}>
            <Link to={path}>{path}</Link>
          </h2>
        ))}
      </div>
    </ForegroundLayer>
  );
}

export default DemoForeground;
