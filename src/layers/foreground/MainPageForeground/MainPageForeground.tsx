import styled from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { logos } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import ApprovePermissionModalInner from "~/components/organizations/ApprovePermissionModalInner";
import { REGISTRATION_PATH } from "~/pages";
import { modalControlAtom } from "~/stores/modal";
import { permissionAtom, PERSONAL_DATA } from "~/stores/permission";
import ForegroundLayer from "../ForegroundLayer";

function MainPageForeground() {
  const navigate = useNavigate();
  const [, setPermission] = useAtom(permissionAtom);
  const [, setModal] = useAtom(modalControlAtom);
  return (
    <ForegroundLayer>
      <RootFrame>
        <LogoFrame>
          <Logo src={logos.Logo1} alt="" />
        </LogoFrame>
        <MessageFrame>지수의 지구에 오신걸 환영합니다.</MessageFrame>
        <ButtonFrame>
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
        </ButtonFrame>
      </RootFrame>
    </ForegroundLayer>
  );
}
export default MainPageForeground;

const RootFrame = styled.div`
  display: flex;
  height: 100vh;
  width: 85vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoFrame = styled.div`
  width: 60vw;
  margin-bottom: 4rem;
`;
const Logo = styled.img`
  object-fit: cover;
  width: 100%;
`;
const MessageFrame = styled.div`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;
const ButtonFrame = styled.div`
  width: 100%;
  button {
    height: 3.5rem;
  }
`;
