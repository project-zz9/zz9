import styled from "styled-components";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { useHistory } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";

interface IGuestbookForegroundProps {
  uuid: string | undefined;
}

function GuestbookForeground({ uuid }: IGuestbookForegroundProps) {
  const history = useHistory();
  const [, setModal] = useAtom(modalControlAtom);

  const visitor = useQuery<Visitor>(
    { collection: "visitor", method: "get" },
    uuid
  );

  useEffect(() => {
    if (!visitor?.visited) {
      setModal({
        type: "information",
        content: {
          title: "방명록 작성 불가",
          body: "입장하시기 전에는 방명록을 작성하실 수 없습니다!",
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
      <RootFrame></RootFrame>
    </ForegroundLayer>
  );
}

export default GuestbookForeground;

const RootFrame = styled.div`
  width: 90vw;
`;
