import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { removeVisitor } from "~/api/visitor";
import { INTERVAL_TIME, SEPARATOR } from "~/app/constant";
import DataTable from "~/components/molecules/DataTable";
import { useQuery } from "~/hooks/useQuery";
import { modalControlAtom } from "~/stores/modal";

function VisitorTable() {
  const [, setModal] = useAtom(modalControlAtom);
  const [tick, setTick] = useState<number>(0);
  const refresh = useCallback(() => setTick(Math.random()), []);
  const visitors = useQuery<Visitor[]>({ collection: "visitor" }, "all", tick);
  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, INTERVAL_TIME);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Promise.all(keys.map((key) => removeVisitor(key))).then(() => {
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
      {visitors && (
        <DataTable
          title={"사전예약자"}
          rows={visitors}
          preDefinedHeader={[
            {
              id: "name",
              disablePadding: false,
              label: "방문자 이름",
              width: 150,
            },
            {
              id: "phoneNumber",
              disablePadding: false,
              label: "연락처",
              width: 200,
            },
            {
              id: "relationship",
              disablePadding: false,
              label: "추가 정보",
              getData: (data: string) => {
                const [direction, card] = data.split(SEPARATOR);
                return `${direction} / ${card}`;
              },
            },
            {
              id: "visitTime",
              disablePadding: false,
              label: "예약시간",
            },
            {
              id: "visited",
              disablePadding: false,
              label: "입장시간",
              dataType: "date",
            },
          ]}
          defaultOrder="desc"
          defaultOrderBy={"name"}
          refresh={refresh}
          onDeleteHandler={onDeleteHandler}
        />
      )}
    </div>
  );
}

export default VisitorTable;
