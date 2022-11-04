import { useAtom } from "jotai";
import { useMemo } from "react";
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";
import { modalControlAtom } from "~/stores/modal";
import ConfirmVisitTimeModalInner from "~/components/organizations/ConfirmVisitTimeModalInner";

import type { VisitorData } from "~/app/jsonSchema";
import type { NavigateFunction } from "react-router-dom";
import { INVITATION_PREVIEW_PATH } from "~/pages";

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
      relationship: () => {
        navigate(INVITATION_PREVIEW_PATH);
      },
    }),
    [data, navigate, goNextStage, setModal]
  );
  return checkCallbackHandlers;
}
