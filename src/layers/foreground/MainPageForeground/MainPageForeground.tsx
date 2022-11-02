import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import ApprovePermissionModalInner from "~/components/organizations/ApprovePermissionModalInner";
import { MANAGEMENT_PATH, REGISTRATION_PATH } from "~/pages";
import { modalControlAtom } from "~/stores/modal";
import ForegroundLayer from "../ForegroundLayer";

function MainPageForeground() {
  const navigate = useNavigate();
  const [, setModal] = useAtom(modalControlAtom);
  return (
    <ForegroundLayer>
      <div>
        <h2>
          <MonotonicButton
            onClick={() => {
              setModal({
                type: "confirm",
                stacked: true,
                Element: ({ activate }) => (
                  <ApprovePermissionModalInner activate={activate} />
                ),
                onSubmit: {
                  label: "계속하기",
                  handler: () => {
                    navigate(REGISTRATION_PATH);
                  },
                },
                onCancel: {
                  hide: true,
                },
              });
            }}
          >
            REGISTRATION
          </MonotonicButton>
          <Link to={REGISTRATION_PATH}>{REGISTRATION_PATH}</Link>
        </h2>
        <h2>
          <Link to={MANAGEMENT_PATH}>{MANAGEMENT_PATH}</Link>
        </h2>
        <ul>
          <li>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setModal({
                  type: "confirm",
                  stacked: true,
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
      </div>
    </ForegroundLayer>
  );
}
export default MainPageForeground;
