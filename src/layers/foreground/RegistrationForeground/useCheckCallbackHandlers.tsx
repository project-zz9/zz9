import { useAtom } from "jotai";
import { useMemo } from "react";
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";
import { modalControlAtom } from "~/stores/modal";
import ConfirmVisitTimeModalInner from "~/components/organizations/ConfirmVisitTimeModalInner";

import { HOME_PATH, INVITATION_PREVIEW_PATH } from "~/pages";
import { getVisitor, setVisitor } from "~/api/visitor";

export function useCheckCallbackHandlers(
  data: VisitorData,
  goNextStage: () => void,
  history: any
) {
  const [, setModal] = useAtom(modalControlAtom);
  const checkCallbackHandlers: Record<string, () => boolean> = useMemo(
    () => ({
      phoneNumber: () => {
        setModal({
          type: "confirm",
          Element: () => (
            <ConfirmPersonalDataModalInner
              name={data.name}
              phoneNumber={data.phoneNumber}
            />
          ),
          onSubmit: {
            handler: async () => {
              const visitor = await getVisitor(data);
              if (visitor) {
                history.replace(HOME_PATH);
                setModal({
                  type: "information",
                  content: {
                    title: "이미 사전 등록을 진행하셨습니다",
                    body: "시간을 변경해야 하신다면, 지수에게 연락해주세요!",
                  },
                  onSubmit: {
                    label: "확인",
                  },
                });
              } else {
                goNextStage();
              }
            },
            label: "확인",
          },
          onCancel: {
            label: "수정",
          },
        });
        return false;
      },
      visitTime: () => {
        setModal({
          type: "confirm",
          Element: () => (
            <ConfirmVisitTimeModalInner visitTime={data.visitTime} />
          ),
          onSubmit: {
            handler: () => {
              goNextStage();
            },
            label: "확인",
          },
          onCancel: {
            label: "수정",
          },
        });
        return false;
      },
      relationship: () => {
        setVisitor(data).then((visitor: string | null) => {
          if (visitor) {
            history.replace(INVITATION_PREVIEW_PATH.replace(":uuid", visitor));
          } else {
            history.replace(HOME_PATH);
            setModal({
              type: "information",
              content: {
                title: "등록 오류가 발생하였습니다.",
                body: "계속 오류가 발생하면, 지수에게 문의해주세요!",
              },
              onSubmit: {
                label: "확인",
              },
            });
          }
        });
        return true;
      },
    }),
    [setModal, data, history, goNextStage]
  );
  return checkCallbackHandlers;
}
