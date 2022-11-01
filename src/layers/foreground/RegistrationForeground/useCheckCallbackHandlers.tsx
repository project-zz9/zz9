import { useAtom } from "jotai";
import { useMemo } from "react";
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";
import { modalControlAtom } from "~/stores/modal";

import type { VisitorData } from "~/app/jsonSchema";

export function useCheckCallbackHandlers(data: VisitorData) {
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
              console.log("WOW");
            },
            label: "확인",
          },
          onCancel: {
            handler: () => {
              console.log("IEW");
            },
            label: "수정",
          },
        });
      },
      additional: () => {},
    }),
    [data, setModal]
  );
  return checkCallbackHandlers;
}
