import { useAtom } from "jotai";
import { useMemo } from "react";
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";
import { modalControlAtom } from "~/stores/modal";
import ConfirmVisitTimeModalInner from "~/components/organizations/ConfirmVisitTimeModalInner";

import type { VisitorData } from "~/app/jsonSchema";
import type { NavigateFunction } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import ApprovePermissionModalInner from "~/components/organizations/ApprovePermissionModalInner";

export function useCheckCallbackHandlers(
  data: VisitorData,
  goNextStage: () => void,
  navigate: NavigateFunction
) {
  const [, setModal] = useAtom(modalControlAtom);
  const checkCallbackHandlers: Record<string, () => void> = useMemo(
    () => ({
      approvePermission: () => {
        setModal({
          type: "confirm",
          stacked: true,
          Element: ({ activate }) => (
            <ApprovePermissionModalInner activate={activate} />
          ),
          onSubmit: {
            label: "계속하기",
          },
          onCancel: {
            handler: () => {
              navigate(HOME_PATH);
            },
            hide: true,
          },
        });
      },
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
      relationship: () => {},
    }),
    [data, goNextStage, navigate, setModal]
  );
  return checkCallbackHandlers;
}
