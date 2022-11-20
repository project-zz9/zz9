import dayjs from "dayjs/esm";
import { useMemo } from "react";
import ConfirmModalInner from "~/components/molecules/ConfirmModalInner";

interface IConfirmVisitTimeModalInnerProps {
  visitTime: string | undefined;
}

function ConfirmVisitTimeModalInner({
  visitTime,
}: IConfirmVisitTimeModalInnerProps) {
  const { date, time } = useMemo(() => {
    const datetime = dayjs(visitTime);
    return {
      date: datetime.format("YYYY년 MM월 DD일"),
      time: datetime.format("HH:00"),
    };
  }, [visitTime]);

  return (
    <ConfirmModalInner
      title={[
        [
          {
            value: "선택하신 날짜와 시간으로",
          },
        ],
        [
          {
            type: "emphasis",
            value: " 방문을 확정",
          },
          {
            value: "할까요?",
          },
        ],
      ]}
      contents={
        visitTime
          ? [
              {
                label: "방문날짜",
                value: date,
              },
              {
                label: "방문시각",
                value: time,
              },
            ]
          : []
      }
    />
  );
}

export default ConfirmVisitTimeModalInner;