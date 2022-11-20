import styled from "styled-components";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { useHistory } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";
import InvitationTabs from "~/components/organizations/InvitationTabs";
import { FirestoreApi } from "~/api/base";
import dayjs from "dayjs";
import { WEEK } from "~/app/constant";

interface IInvitationForegroundProps {
  uuid: string | undefined;
}

function InvitationForeground({ uuid }: IInvitationForegroundProps) {
  const history = useHistory();
  const [, setModal] = useAtom(modalControlAtom);
  const [tick, setTick] = useState(0);
  const refetch = useCallback(() => setTick(Math.random()), []);

  const visitor = useQuery<Visitor>(
    { collection: "visitor", method: "get" },
    uuid,
    tick
  );

  useEffect(() => {
    if (!visitor) return;

    const visitTime = dayjs(visitor.visitTime).unix();
    const today = FirestoreApi.serverTime();
    if (visitTime - today > WEEK) {
      setModal({
        type: "information",
        content: {
          title: "개봉되지 않은 초대장",
          body: "전시회 시작 7일 전부터 초대장을 볼 수 있습니다!",
        },
        onSubmit: {
          label: "확인",
          handler: () => {
            history.push(HOME_PATH);
          },
        },
      });
    }
  }, [history, setModal, visitor]);

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
            history.push(HOME_PATH);
          },
        },
      });
    }
  }, [history, setModal, visitor]);

  return (
    <ForegroundLayer>
      <RootFrame>
        {uuid && visitor && (
          <InvitationTabs uuid={uuid} visitor={visitor} refetch={refetch} />
        )}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationForeground;

const RootFrame = styled.div`
  width: 90vw;
`;
