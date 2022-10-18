import { useAtom } from "jotai";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { pages } from "~/pages";
import { ProtectedRoute } from "~/routers/PrivateRoute";
import { authAtom } from "~/stores/auth";

function App() {
  const [, setUser] = useAtom(authAtom);
  return (
    <>
      <Router>
        <ul>
          {pages.map(({ path, name }) => (
            <li key={name}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setUser("user")}>Sign In</button>
        </div>
        <div>
          <button onClick={() => setUser(null)}>Sign Out</button>
        </div>
        <Routes>
          {pages.map(({ path, Component, auth }) =>
            auth ? (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute element={<Component />} />}
              />
            ) : (
              <Route key={path} path={path} element={<Component />} />
            )
          )}
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
