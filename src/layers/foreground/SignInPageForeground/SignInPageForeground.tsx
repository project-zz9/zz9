import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { authAtom } from "~/stores/auth";
import { useNavigate } from "react-router-dom";
import ForegroundLayer from "../ForegroundLayer";
import { MANAGEMENT_PATH } from "~/pages";

function SignInPageForeground() {
  const [, setUser] = useAtom(authAtom);
  const navigate = useNavigate();
  return (
    <ForegroundLayer>
      <div>
        <h1>Sign In</h1>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setUser("user");
              navigate(MANAGEMENT_PATH);
            }}
          >
            Sign In
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={() => setUser(null)}>
            Sign Out
          </Button>
        </div>
      </div>
    </ForegroundLayer>
  );
}

export default SignInPageForeground;
