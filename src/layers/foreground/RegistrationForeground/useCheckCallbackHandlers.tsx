import { useAtom } from "jotai";
import { useMemo } from "react";
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";
import { modalControlAtom } from "~/stores/modal";
import ConfirmVisitTimeModalInner from "~/components/organizations/ConfirmVisitTimeModalInner";

import type { NavigateFunction } from "react-router-dom";
import { HOME_PATH, INVITATION_PREVIEW_PATH } from "~/pages";
import { getVisitor, setVisitor } from "~/api/visitor";

export function useCheckCallbackHandlers(
  data: VisitorData,
  goNextStage: () => void,
  navigate: NavigateFunction
) {
  const [, setModal] = useAtom(modalControlAtom);
  const checkCallbackHandlers: Record<string, () => void> = useMemo(
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
                navigate(HOME_PATH);
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
      },
      relationship: async () => {
        await setVisitor(data);
        navigate(INVITATION_PREVIEW_PATH);
      },
    }),
    [data, navigate, goNextStage, setModal]
  );
  return checkCallbackHandlers;
}
