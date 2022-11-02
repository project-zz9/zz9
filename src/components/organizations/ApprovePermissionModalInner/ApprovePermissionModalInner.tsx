import { Button, IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import TitleLine from "~/components/atoms/TitleLine";
import { modalAtom } from "~/stores/modal";
import ApprovePermissionModalDetailInner from "../ApprovePermissionModalDetailInner";
import { CheckSquare, Square } from "react-feather";

interface IApprovePermissionModalInnerProps {
  activate?: (active: boolean | ((prev: boolean) => boolean)) => void;
}

function ApprovePermissionModalInner({
  activate,
}: IApprovePermissionModalInnerProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [, setModal] = useAtom(modalAtom);
  useEffect(() => {
    activate?.(checked);
  }, [activate, checked]);

  return (
    <div>
      <TitleLine>지수의 지구</TitleLine>
      <div>
        <IconButton
          size="large"
          onClick={() => {
            setChecked((check) => !check);
          }}
        >
          {checked ? <CheckSquare color="#FF5A0D" /> : <Square />}
        </IconButton>
        개인정보 수집/이용 동의하기
      </div>
      <div>개인 정보 수집, 이용 동의서 (전시 사전 등록 신청)</div>
      <div>
        <p>
          지수의 지구의 개인정보 수집 이용 목적은 다음과 같습니다. 내용을 자세히
          읽어보신 후 동의 여부를 결정하여 주시길 바랍니다.
        </p>
        <p>
          귀하는 아래와 같이 개인정보를 수집, 이용하는데 동의를 거부할 권리가
          있습니다. 필수 수집 항목에 대한 동의를 거절하는 경우 전시회 사전
          등록이 제한 될 수 있습니다.
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>수집목적</th>
              <th>필수항목</th>
              <th>보유, 이용 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>전시 사전 등록 신청</td>
              <td>이름, 연락처</td>
              <td>수집일로부터 60일간 (전시 종료일로부터 30일간)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        자세한 내용은 개인정보 처리방침을 확인해주세요.{" "}
        <Button
          onClick={() => {
            setChecked(true);
          }}
        >
          보기
        </Button>
        <Button
          onClick={() => {
            setModal({
              type: "fullscreen",
              Element: () => <ApprovePermissionModalDetailInner />,
              onSubmit: {
                label: "계속하기",
              },
            });
          }}
        >
          자세히
        </Button>
      </div>
    </div>
  );
}

export default ApprovePermissionModalInner;
