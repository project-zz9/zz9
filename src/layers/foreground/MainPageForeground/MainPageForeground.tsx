import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import ApprovePermissionModalInner from "~/components/organizations/ApprovePermissionModalInner";
import { MANAGEMENT_PATH, REGISTRATION_PATH } from "~/pages";
import { modalControlAtom } from "~/stores/modal";
import { permissionAtom, PERSONAL_DATA } from "~/stores/permission";
import ForegroundLayer from "../ForegroundLayer";

function MainPageForeground() {
  const navigate = useNavigate();
  const [, setPermission] = useAtom(permissionAtom);
  const [, setModal] = useAtom(modalControlAtom);
  return (
    <ForegroundLayer>
      <div>
        <img src={}
      </div>
      <div></div>
      <div>
        <MonotonicButton
          color="secondary"
          onClick={() => {
            setModal({
              type: "confirm",
              Element: ({ activate }) => (
                <ApprovePermissionModalInner activate={activate} />
              ),
              onSubmit: {
                label: "계속하기",
                handler: () => {
                  setPermission((permission) => ({
                    ...permission,
                    [PERSONAL_DATA]: true,
                  }));
                  navigate(REGISTRATION_PATH);
                },
              },
              onCancel: {
                hide: true,
              },
            });
          }}
        >
          등록하기
        </MonotonicButton>
      </div>
    </ForegroundLayer>
  );
}
export default MainPageForeground;
