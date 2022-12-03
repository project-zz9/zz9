import { useCallback, useState } from "react";
import DataTable from "~/components/molecules/DataTable";
import { useQuery } from "~/hooks/useQuery";
import { removeGuestbook } from "~/api/guestbook";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";

function GuestbookTable() {
  const [tick, setTick] = useState<number>(0);
  const refresh = useCallback(() => setTick(Math.random()), []);
  const guestbooks = useQuery<Guestbook[]>(
    { collection: "guestbook" },
    "all",
    tick
  );
  const [, setModal] = useAtom(modalControlAtom);
  const onDeleteHandler = (keys: string[], callback?: () => void) => {
    setModal({
      type: "confirm",
      content: {
        title: "방명록 삭제",
        body: `선택된 ${keys.length}개의 방명록을 삭제합니다.`,
      },
      onSubmit: {
        label: "삭제",
        handler: () => {
          Promise.all(keys.map((key) => removeGuestbook(key))).then(() => {
            refresh();
            callback?.();
          });
        },
      },
      onCancel: {
        label: "취소",
      },
    });
  };
  return (
    <div>
      {guestbooks && (
        <DataTable
          title={"방명록"}
          rows={guestbooks}
          preDefinedHeader={[
            {
              id: "displayName",
              disablePadding: false,
              label: "작성자",
              width: 150,
            },
            {
              id: "timestamp",
              disablePadding: false,
              label: "등록시간",
              width: 200,
              dataType: "date",
            },
            {
              id: "message",
              disablePadding: false,
              label: "방명록",
              dataType: "multi-line",
            },
          ]}
          defaultOrder="desc"
          defaultOrderBy={"timestamp"}
          refresh={refresh}
          onDeleteHandler={onDeleteHandler}
        />
      )}
    </div>
  );
}

export default GuestbookTable;
