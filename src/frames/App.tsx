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
            <li>
              <Link key={name} to={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <Routes>
          {unprotectedPage.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
