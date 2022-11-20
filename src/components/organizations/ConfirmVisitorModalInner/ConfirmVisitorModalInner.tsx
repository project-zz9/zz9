import { useMemo } from "react";
import ConfirmModalInner from "~/components/molecules/ConfirmModalInner";

interface IConfirmVisitorModalInnerProps {
  name?: string;
  phoneNumber?: string;
  visitTime?: string;
}

function ConfirmVisitorModalInner({
  name,
  phoneNumber,
  visitTime,
}: IConfirmVisitorModalInnerProps) {
  const [date, time] = useMemo(() => visitTime?.split(" ") ?? [], [visitTime]);
  return (
    <ConfirmModalInner
      title={[
        [
          {
            value: "입장 QR 인증",
          },
        ],
      ]}
      titleSize="1.5rem"
      contents={[
        ...(name ? [{ label: "이름", value: name }] : []),
        ...(phoneNumber ? [{ label: "연락처", value: phoneNumber }] : []),
        ...(date ? [{ label: "방문날짜", value: date }] : []),
        ...(time ? [{ label: "방문시간", value: time }] : []),
      ]}
    />
  );
}

export default ConfirmVisitorModalInner;
