import ConfirmModalInner from "~/components/molecules/ConfirmModalInner";

interface IConfirmPersonalDataModalInnerProps {
  name: string | undefined;
  phoneNumber: string | undefined;
}

function ConfirmPersonalDataModalInner({
  name,
  phoneNumber,
}: IConfirmPersonalDataModalInnerProps) {
  return (
    <ConfirmModalInner
      title={[
        [
          {
            span: "이름과 전화번호가 맞는지",
          },
        ],
        [
          {
            type: "emphasis",
            span: "꼼꼼히",
          },
          {
            span: " 확인해주세요 🙏",
          },
        ],
      ]}
      contents={[
        ...(name ? [{ label: "이름", value: name }] : []),
        ...(phoneNumber ? [{ label: "연락처", value: phoneNumber }] : []),
      ]}
    />
  );
}

export default ConfirmPersonalDataModalInner;
