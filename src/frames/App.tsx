import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { unprotectedPage } from "~/pages";

function App() {
  return (
    <>
      <Router>
        <ul>
          {unprotectedPage.map(({ path, name }) => (
            <li key={name}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
        <Routes>
          {unprotectedPage.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
