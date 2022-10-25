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
                    handler: () =>
                      setModal({
                        type: "fullscreen",
                        content: {
                          title: "Fullscreen",
                          body: "많은 내용을 이 내부에 담을 것입니다.",
                        },
                        onSubmit: {
                          label: "뒤로가기",
                        },
                      }),
                    nested: true,
                  },
                  onCancel: {
                    label: "취소",
                    handler: () => console.log("NOOOOO"),
                  },
                })
              }
            >
              Show Confirm
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setModal({
                  type: "fullscreen",
                  content: {
                    title: "Fullscreen",
                    body: "많은 내용을 이 내부에 담을 것입니다.",
                  },
                  onSubmit: {
                    label: "뒤로가기",
                  },
                })
              }
            >
              Show Fullscreen Description
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setModal({
                  type: "information",
                  content: {
                    title: "Info.",
                    body: "당신에게 새로운 정보를 제공하려고 합니다.",
                  },
                  onSubmit: {
                    label: "확인",
                  },
                })
              }
            >
              Show Information
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
