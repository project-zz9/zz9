import { Route, useLocation, Switch, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { pages } from "~/pages";
import { ProtectedRoute } from "~/routers/PrivateRoute";

function Application() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Switch>
          {pages.map(({ path, Component, auth }) =>
            auth ? (
              <ProtectedRoute key={path} path={path}>
                <Component />
              </ProtectedRoute>
            ) : (
              <Route key={path} path={path}>
                <Component />
              </Route>
            )
          )}
          <Redirect from="/" to="/home" />
          <Route path="*">
            <div>
              <h1>404</h1>
            </div>
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Application;
