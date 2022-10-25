import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Modal from "~/layers/modal";
import { pages } from "~/pages";
import { ProtectedRoute } from "~/routers/PrivateRoute";

function App() {
  return (
    <>
      <Router>
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
      <Modal />
    </>
  );
}

export default App;
