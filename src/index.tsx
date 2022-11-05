import ReactDOM from "react-dom/client";
import "~/assets/styles/global.css";
import Root from "~/frames/Root";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Root />);
