import { IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { modalAtom } from "~/stores/modal";
import ApprovePermissionModalDetailInner from "../ApprovePermissionModalDetailInner";
import { CheckSquare, Square } from "react-feather";
import styled from "styled-components";

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
    <ModalInnerFrame>
      <TitleFrame>지수의 지구</TitleFrame>
      <ConfirmFrame>
        <IconButton
          sx={{
            padding: 0,
            marginRight: "0.5rem",
          }}
          onClick={() => {
            setChecked((check) => !check);
          }}
        >
          <span>{checked ? <CheckSquare color="#FF5A0D" /> : <Square />}</span>
        </IconButton>
        개인정보 수집 / 이용 동의하기
      </ConfirmFrame>
      <InformationFrame>
        개인 정보 수집, 이용 동의서 (전시 사전 등록 신청)
      </InformationFrame>
      <ContentFrame>
        <div>
          지수의 지구의 개인정보 수집 이용 목적은 다음과 같습니다. 내용을 자세히
          읽어보신 후 동의 여부를 결정하여 주시길 바랍니다.
        </div>
        <div>
          귀하는 아래와 같이 개인정보를 수집, 이용하는데 동의를 거부할 권리가
          있습니다. 필수 수집 항목에 대한 동의를 거절하는 경우 전시회 사전
          등록이 제한 될 수 있습니다.
        </div>
      </ContentFrame>
      <TableFrame>
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
              <td>
                수집일로부터 60일간 <br />
                (전시 종료일로부터 30일간)
              </td>
            </tr>
          </tbody>
        </table>
      </TableFrame>

      <ContentFrame>
        자세한 내용은 개인정보 처리방침을 확인해주세요.
        <IconButton
          sx={{
            padding: 0,
            marginLeft: "5px",
          }}
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
          <LinkFrame>보기</LinkFrame>
        </IconButton>
      </ContentFrame>
    </ModalInnerFrame>
  );
}

export default ApprovePermissionModalInner;

const ModalInnerFrame = styled.div`
  margin: 20px 20px 0 20px;
`;

const TitleFrame = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const ConfirmFrame = styled.div`
  text-align: center;
  font-size: 0.9rem;
  padding-right: 0.5rem;
`;
const InformationFrame = styled.div`
  text-align: center;
  color: #868686;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;
const ContentFrame = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
`;
const TableFrame = styled.div`
  margin-bottom: 0.85rem;
  table {
    width: 100%;
    thead {
      background-color: black;
      th {
        color: white;
        min-width: 5rem;
        font-size: 0.7rem;
      }
    }
    tbody {
      background-color: #e6e6e6;
      td {
        text-align: center;
        font-size: 0.65rem;
      }
    }
  }
`;
const LinkFrame = styled.div`
  color: #ff5a0d;
  text-decoration: underline;
  font-size: 0.85rem;
`;
