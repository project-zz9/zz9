import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { pages } from "~/pages";
import { ProtectedRoute } from "~/routers/PrivateRoute";
import "./Application.css";

function Application() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
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
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Application;
