import styled from "styled-components";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { useHistory } from "react-router-dom";
import { HOME_PATH, INVITATION_PATH } from "~/pages";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";
import GuestbookTabs from "~/components/organizations/GuestbookTabs";
import { setGuestbook } from "~/api/guestbook";

interface IGuestbookForegroundProps {
  uuid: string | undefined;
}

function GuestbookForeground({ uuid }: IGuestbookForegroundProps) {
  const [data, setData] = useState<GuestbookData>({});
  const history = useHistory();
  const [, setModal] = useAtom(modalControlAtom);
  const visitor = useQuery<Visitor>({ collection: "visitor" }, uuid);

  const guestbook = useQuery<Guestbook>(
    {
      collection: "guestbook",
    },
    uuid
  );

  useEffect(() => {
    if (guestbook) {
      setModal({
        type: "information",
        content: {
          title: "이미 방명록을 작성하셨습니다.",
          body: "방명록은 한 번만 작성할 수 있습니다.",
        },
        onSubmit: {
          label: "뒤로가기",
          handler: () => {
            history.replace(
              uuid ? INVITATION_PATH.replace(":uuid", uuid) : HOME_PATH
            );
          },
        },
      });
    }
  }, [guestbook, history, setModal, uuid]);

  useEffect(() => {
    if (visitor && !visitor?.visited) {
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
      <RootFrame>
        {uuid && visitor && (
          <GuestbookTabs
            uuid={uuid}
            visitor={visitor}
            setGuestbookData={setData}
            sendGuestbook={() => {
              setGuestbook(uuid, data).then((result) => {
                if (result) {
                  setModal({
                    type: "information",
                    content: {
                      title: "방명록 작성 완료",
                      body: "방명록이 작성되었습니다.",
                    },
                    onSubmit: {
                      label: "확인",
                    },
                  });
                  history.replace(INVITATION_PATH.replace(":uuid", uuid));
                } else {
                  setModal({
                    type: "information",
                    content: {
                      title: "방명록 작성 실패",
                      body: "알 수 없는 오류가 발생하였습니다.",
                    },
                    onSubmit: {
                      label: "확인",
                    },
                  });
                }
              });
            }}
          />
        )}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default GuestbookForeground;

const RootFrame = styled.div`
  width: 90vw;
`;
