import styled from "styled-components";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";
import InvitationTabs from "~/components/organizations/InvitationTabs";

interface IInvitationForegroundProps {
  uuid: string | undefined;
}

function InvitationForeground({ uuid }: IInvitationForegroundProps) {
  const navigate = useNavigate();
  const [, setModal] = useAtom(modalControlAtom);
  const visitor = useQuery<VisitorData>(
    { collection: "visitor", method: "get" },
    uuid
  );

  useEffect(() => {
    if (visitor === null) {
      setModal({
        type: "information",
        content: {
          title: "정보 조회 실패",
          body: "사전등록 정보를 찾을 수 없습니다!",
        },
        onSubmit: {
          label: "뒤로가기",
          handler: () => {
            navigate(HOME_PATH);
          },
        },
      });
    }
  }, [navigate, setModal, visitor]);
  return (
    <ForegroundLayer>
      <RootFrame>
        {uuid && visitor && <InvitationTabs uuid={uuid} visitor={visitor} />}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationForeground;

const RootFrame = styled.div`
  width: 90vw;
`;
