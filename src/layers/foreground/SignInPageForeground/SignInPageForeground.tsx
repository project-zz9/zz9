import { Button, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { authAtom } from "~/stores/auth";
import { useHistory } from "react-router-dom";
import ForegroundLayer from "../ForegroundLayer";
import { MANAGEMENT_PATH } from "~/pages";
import { useState } from "react";

const label = "관리자 id를 입력하세요";

function SignInPageForeground() {
  const [, setUser] = useAtom(authAtom);
  const [admin, setAdmin] = useState<string>("");
  const history = useHistory();
  return (
    <ForegroundLayer>
      <div>
        <div>
          <TextField
            id="standard-basic"
            label="Admin"
            variant="standard"
            placeholder={label}
            fullWidth
            onChange={({ target }) => {
              setAdmin(target.value);
            }}
            value={admin}
          />
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setUser("user");
              history.push(MANAGEMENT_PATH);
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
