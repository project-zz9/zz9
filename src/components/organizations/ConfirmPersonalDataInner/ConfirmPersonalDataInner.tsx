import ConfirmModalInner from "~/components/molecules/ConfirmModalInner";

interface IConfirmPersonalDataInnerProps {
  name: string | undefined;
  phoneNumber: string | undefined;
}

function ConfirmPersonalDataInner({
  name,
  phoneNumber,
}: IConfirmPersonalDataInnerProps) {
  return (
    <ConfirmModalInner
      title={["이름과 전화번호가 맞는지", "꼼꼼히 확인해주세요 🙏"]}
      contents={[
        ...(name ? [{ label: "이름", value: name }] : []),
        ...(phoneNumber ? [{ label: "전화번호", value: phoneNumber }] : []),
      ]}
    />
  );
}

export default ConfirmPersonalDataInner;
