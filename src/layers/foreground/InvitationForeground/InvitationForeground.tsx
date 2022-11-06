import styled from "styled-components";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";
import InvitationTabs from "~/components/organizations/InvitationTabs";

interface IInvitationForegroundProps {
  uuid: string | undefined;
}

const visitor = {
  name: "보조개협곡",
  phoneNumber: "010-9123-1241",
  visitTime: "2023-04-28 14:00",
  relationship: "10cm::card3",
};

function InvitationForeground({ uuid }: IInvitationForegroundProps) {
  const navigate = useNavigate();
  const [, setModal] = useAtom(modalControlAtom);
  const [tab, setTab] = useState<string>("portal");
  // const visitor = useQuery<VisitorData>(
  //   { collection: "visitor", method: "get" },
  //   uuid
  // );

  // useEffect(() => {
  //   if (visitor === null) {
  //     setModal({
  //       type: "information",
  //       content: {
  //         title: "정보 조회 실패",
  //         body: "사전등록 정보를 찾을 수 없습니다!",
  //       },
  //       onSubmit: {
  //         label: "뒤로가기",
  //         handler: () => {
  //           navigate(HOME_PATH);
  //         },
  //       },
  //     });
  //   }
  // }, [navigate, setModal, visitor]);
  return (
    <ForegroundLayer>
      <RootFrame>
        {visitor && (
          <InvitationTabs visitor={visitor} tab={tab} tabNavigate={setTab} />
        )}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationForeground;

const RootFrame = styled.div`
  display: flex;
  width: 80vw;
  height: 85vh;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 12.5vh;
`;
