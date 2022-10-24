import { Button } from "@mui/material";
import { useAtom } from "jotai";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Modal from "~/layers/modal";
import { pages } from "~/pages";
import { ProtectedRoute } from "~/routers/PrivateRoute";
import { authAtom } from "~/stores/auth";
import { modalControlAtom } from "~/stores/modal";

function App() {
  const [, setUser] = useAtom(authAtom);
  const [, setModal] = useAtom(modalControlAtom);
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
        <ul>
          <li>
            <Button variant="contained" onClick={() => setUser("user")}>
              Sign In
            </Button>
          </li>
          <li>
            <Button variant="contained" onClick={() => setUser(null)}>
              Sign Out
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setModal({
                  type: "confirm",
                  content: {
                    title: "MODAL",
                    body: "테스트용 내용입니다?",
                  },
                  onSubmit: {
                    label: "확인",
                    handler: () => console.log("YEEEEE"),
                  },
                  onCancel: {
                    label: "취소",
                    handler: () => console.log("NOOOOO"),
                  },
                })
              }
            >
              Show Modal
            </Button>
          </li>
        </ul>

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
