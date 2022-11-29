import { Button, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { roleAtom } from "~/stores/role";
import { useHistory } from "react-router-dom";
import ForegroundLayer from "../ForegroundLayer";
import { MANAGEMENT_PATH } from "~/pages";
import { useState } from "react";
import { checkAuthorize } from "~/api/auth";
import { modalControlAtom } from "~/stores/modal";
import styled from "styled-components";

const label = "관리자 id를 입력하세요";

function SignInPageForeground() {
  const [, setRole] = useAtom(roleAtom);
  const [, setModal] = useAtom(modalControlAtom);
  const [id, setId] = useState<string>(
    "bkzErenoCKaMBjoTsya2iKPyd2bsAsmerH3DTcJy7odcrfhqjsnoixz6nLTcL7RQ"
  );
  const history = useHistory();
  return (
    <ForegroundLayer>
      <RootFrame>
        <InputFrame>
          <TextField
            id="standard-basic"
            size="medium"
            label="ID"
            variant="standard"
            placeholder={label}
            type="password"
            fullWidth
            onChange={({ target }) => {
              setId(target.value);
            }}
            value={id}
          />
        </InputFrame>
        <ButtonFrame>
          <Button
            variant="contained"
            disabled={!id}
            onClick={() => {
              id &&
                checkAuthorize(id).then((role) => {
                  if (role) {
                    setRole(role);
                    history.push(MANAGEMENT_PATH);
                  } else {
                    setModal({
                      type: "information",
                      content: {
                        title: "잘못된 ID",
                        body: "입력하신 ID가 존재하지 않거나 역할이 부여되지 않았습니다.",
                      },
                      onSubmit: {
                        label: "확인",
                      },
                      clean: () => {
                        setId("");
                      },
                    });
                  }
                });
            }}
          >
            인증
          </Button>
        </ButtonFrame>
      </RootFrame>
    </ForegroundLayer>
  );
}

export default SignInPageForeground;

const RootFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vh;
  div {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;
const InputFrame = styled.div`
  width: 50vw;
`;
const ButtonFrame = styled.div`
  button {
    width: 15vw;
  }
`;
