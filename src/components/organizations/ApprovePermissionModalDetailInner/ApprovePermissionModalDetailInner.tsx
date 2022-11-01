interface IApprovePermissionModalDetailInnerProps {
  activate?: (active: boolean | ((prev: boolean) => boolean)) => void;
}

function ApprovePermissionModalDetailInner({}: IApprovePermissionModalDetailInnerProps) {
  return (
    <div>
      <div>
        <header>
          <h1 className="page-title">지지구 개인정보 수집 및 이용 동의서</h1>
        </header>
        <div className="page-body">
          <p>
            <strong>개인 정보 수집, 이용 동의서 (전시 사전 등록 신청)</strong>
          </p>
          <p>
            지수의 지구의 개인정보 수집 이용 목적은 다음과 같습니다. 내용을
            자세히 읽어보신 후 동의 여부를 결정하여 주시길 바랍니다.
          </p>
          <p>
            귀하는 위와 같이 개인정보를 수집, 이용하는데 동의를 거부할 권리가
            있습니다. 필수 수집 항목에 대한 동의를 거절하는 경우 전시회 사전
            등록이 제한 될 수 있습니다.
          </p>
          <div>
            <p>
              지수의 지구 전시 (이하 &quot;전시”라 함)는 이용자의 개인정보를
              소중히 다루고 있습니다.
            </p>
            <p>
              <strong>[제1조 개인정보의 수집과 이용 목적]</strong>
            </p>
            <p>
              본 전시는 아래와 같은 목적을 위해 개인정보를 수집하여 활용합니다.
              이용자가 제공한 모든 정보는 목적 외 용도로 사용되지 않으며, 이용
              목적이 변경될 때에는 사전에 이용자의 동의를 구합니다.
            </p>
            <p>사전 등록 신청 : 전시 초대장 링크 발송을 위한 사전 등록.</p>
            <p>
              초대장 발송 : 사전 등록 완료자를 대상으로 전시회 초대장 링크 발송.
            </p>
            <p>
              드로우 이벤트 참여 : 전시회에 방문하고, 방명록을 남긴 이용자를
              대상으로한 드로우 이벤트(단, 현장에서 방명록을 작성한 자에 한함)
            </p>
            <p>
              <strong>[제2조 개인정보의 수집 항목과 수집 방법]</strong>
            </p>
            <p>
              전시는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 아래와 같은
              개인정보를 수집하고 있습니다.
            </p>
            <p>
              1. 개인정보는 사전 등록 및 서비스 이용과정에서 이용자가 개인정보
              수집에 동의를 하고 직접 정보를 입력하는 경우 해당 개인정보를
              수집합니다.
            </p>
            <p>
              2. 전시는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 아래와
              같은 개인정보를 수집하고 있습니다.
            </p>
            <p>사전등록 신청 시</p>
            <p>필수정보: 이름, 전화번호</p>
            <p>3. 수집 및 이용 목적</p>
            <p>
              이용자 식별, 전시 참석 일정 확인, 초대장 전달, 드로우 이벤트 참여
              및 당첨 안내에 활용
            </p>
            <p></p>
            <p>
              본 전시가 이용자의 개인정보를 수집하는 경우에는 반드시사전에
              이용자에게 해당 사실을 알리고 동의를 구하도록 하겠습니다.
            </p>
            <p>
              수집방법은 홈페이지 내 사전 등록 신청이며, 이용자가 동의 버튼을
              클릭할 경우 개인정보 수집에 동의한 것으로 봅니다.
            </p>
            <p></p>
            <p>
              <strong>[제3조 개인정보 수집에 대한 동의]</strong>
            </p>
            <p>
              본 전시는 이용자께서 개인정보 보호정책 또는 이용약관의 내용에 대해
              ‘동의함’ 버튼을 통해 동의 여부를 선택할 수 있는 절차를 마련하여,
              ‘동의함’ 버튼을 선택할 경우 입력하신 개인정보가 전시의 고객DB에
              저장되어 상기 명시된 이용목적에 적합하게 이용되는 것으로
              간주합니다.
            </p>
            <p></p>
            <p>
              <strong>[제4조 개인정보의 처리 및 보유기간]</strong>
            </p>
            <p>
              본 전시는 사전 등록 기간부터 전시 종료 후 1달간 수집한 개인 정보를
              보유 및 이용합니다.
            </p>
            <p>
              정보 삭제를 요청하거나 개인정보의 수집 및 이용에 대한 동의를
              철회하는 경우, 수집 및 이용목적이 달성되거나 보유 및 이용기간이
              종료한 경우 해당 개인정보를 지체 없이 파기합니다.
            </p>
            <p></p>
            <p>
              <strong>[제 5조 개인정보 수집을 거부할 권리]</strong>
            </p>
            <p>
              원칙적으로 개인정보 보호법에 의해 개인정보 수집 동의를 거부할
              권리가 있으며, 수집 동의 거부 시에는 사전 등록 신청이 불가합니다.
            </p>
            <p></p>
            <p>
              <strong>[제6조 개인정보의 제3자 제공]</strong>
            </p>
            <p>
              회사는 개인정보를 수집할 때 얻은 이용자의 동의 범위를 넘어
              이용자의 정보를 이용하거나 제3자에게 제공하지 않습니다. 다만,
              이용자의 동의가 있거나 다음 각 호의 하나에 해당하는 경우에는
              예외로 합니다.
            </p>
            <p>1. 정보통신서비스의 제공에 따른 요금정산을 위하여 필요한 경우</p>
            <p>
              2. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
              불가피한 경우
            </p>
            <p></p>
            <p>
              <strong>[제7조 개인정보의 파기 절차 및 방법]</strong>
            </p>
            <p>
              이용자가 입력하신 정보는 목적이 달성된 후 내부 방침 및 기타 관련
              법령에 의한 정보 보호 사유에 따라 일정 기간 동안 저장된 후
              파기됩니다. 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수
              없는 기술적 방법을 사용하여 삭제합니다.
            </p>
            <p></p>
            <p>
              <strong>[제8조 개인정보의 관리적 보호 대책]</strong>
            </p>
            <p>
              본 전시는 개인정보 보호를 위해 개인정보 보호 책임자를 지정하고
              있습니다. 개인정보와 관련해 문의해 주시면 성심을 다해 답변해
              드리겠습니다.
            </p>
            <p>개인정보 보호 책임자</p>
            <p>성명: 염하지수</p>
            <p>메일: 지수님 메일</p>
            <p>
              이용자는 전시의 서비스를 이용하며 발생하는 모든 개인정보 보호 관련
              민원을 개인정보 보호 책임자 또는 아래 기관의 담당 부서와 상담,
              신고하실 수 있습니다.
            </p>
            <p>개인정보침해신고센터 국번 없이 118 / http://www.118.or.kr</p>
            <p>
              경찰청 사이버테러대응센터 국번 없이 182 /
              http://cyberbureau.police.go.kr
            </p>
            <p>대검찰청 사이버범죄수사단 02-3480-3571 / http://www.spo.go.kr</p>
            <p></p>
            <p>
              <strong>[제9조 고지의 의무]</strong>
            </p>
            <p>
              이 개인정보처리방침은 2023년 N월 N일부터 적용되며, 변경이 있을
              시에는 변경 사항의 시행 7일 전부터 웹사이트의 공지사항 또는 별도
              공지를 통하여 고지할 것입니다.
            </p>
            <p>
              <strong>개인 정보 수집, 이용 동의서 (전시 사전 등록 신청)</strong>
            </p>
            <p>
              지수의 지구의 개인정보 수집 이용 목적은 다음과 같습니다. 내용을
              자세히 읽어보신 후 동의 여부를 결정하여 주시길 바랍니다.
            </p>
            <p>
              귀하는 위와 같이 개인정보를 수집, 이용하는데 동의를 거부할 권리가
              있습니다. 필수 수집 항목에 대한 동의를 거절하는 경우 전시회 사전
              등록이 제한 될 수 있습니다.
            </p>
            <div>
              <p>
                지수의 지구 전시 (이하 &quot;전시”라 함)는 이용자의 개인정보를
                소중히 다루고 있습니다.
              </p>
              <p>
                <strong>[제1조 개인정보의 수집과 이용 목적]</strong>
              </p>
              <p>
                본 전시는 아래와 같은 목적을 위해 개인정보를 수집하여
                활용합니다. 이용자가 제공한 모든 정보는 목적 외 용도로 사용되지
                않으며, 이용 목적이 변경될 때에는 사전에 이용자의 동의를
                구합니다.
              </p>
              <p>사전 등록 신청 : 전시 초대장 링크 발송을 위한 사전 등록.</p>
              <p>
                초대장 발송 : 사전 등록 완료자를 대상으로 전시회 초대장 링크
                발송.
              </p>
              <p>
                드로우 이벤트 참여 : 전시회에 방문하고, 방명록을 남긴 이용자를
                대상으로한 드로우 이벤트(단, 현장에서 방명록을 작성한 자에 한함)
              </p>
              <p>
                <strong>[제2조 개인정보의 수집 항목과 수집 방법]</strong>
              </p>
              <p>
                전시는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 아래와
                같은 개인정보를 수집하고 있습니다.
              </p>
              <p>
                1. 개인정보는 사전 등록 및 서비스 이용과정에서 이용자가 개인정보
                수집에 동의를 하고 직접 정보를 입력하는 경우 해당 개인정보를
                수집합니다.
              </p>
              <p>
                2. 전시는 원활한 서비스 제공을 위해 이용자의 동의를 얻어 아래와
                같은 개인정보를 수집하고 있습니다.
              </p>
              <p>사전등록 신청 시</p>
              <p>필수정보: 이름, 전화번호</p>
              <p>3. 수집 및 이용 목적</p>
              <p>
                이용자 식별, 전시 참석 일정 확인, 초대장 전달, 드로우 이벤트
                참여 및 당첨 안내에 활용
              </p>
              <p></p>
              <p>
                본 전시가 이용자의 개인정보를 수집하는 경우에는 반드시사전에
                이용자에게 해당 사실을 알리고 동의를 구하도록 하겠습니다.
              </p>
              <p>
                수집방법은 홈페이지 내 사전 등록 신청이며, 이용자가 동의 버튼을
                클릭할 경우 개인정보 수집에 동의한 것으로 봅니다.
              </p>
              <p></p>
              <p>
                <strong>[제3조 개인정보 수집에 대한 동의]</strong>
              </p>
              <p>
                본 전시는 이용자께서 개인정보 보호정책 또는 이용약관의 내용에
                대해 ‘동의함’ 버튼을 통해 동의 여부를 선택할 수 있는 절차를
                마련하여, ‘동의함’ 버튼을 선택할 경우 입력하신 개인정보가 전시의
                고객DB에 저장되어 상기 명시된 이용목적에 적합하게 이용되는
                것으로 간주합니다.
              </p>
              <p></p>
              <p>
                <strong>[제4조 개인정보의 처리 및 보유기간]</strong>
              </p>
              <p>
                본 전시는 사전 등록 기간부터 전시 종료 후 1달간 수집한 개인
                정보를 보유 및 이용합니다.
              </p>
              <p>
                정보 삭제를 요청하거나 개인정보의 수집 및 이용에 대한 동의를
                철회하는 경우, 수집 및 이용목적이 달성되거나 보유 및 이용기간이
                종료한 경우 해당 개인정보를 지체 없이 파기합니다.
              </p>
              <p></p>
              <p>
                <strong>[제 5조 개인정보 수집을 거부할 권리]</strong>
              </p>
              <p>
                원칙적으로 개인정보 보호법에 의해 개인정보 수집 동의를 거부할
                권리가 있으며, 수집 동의 거부 시에는 사전 등록 신청이
                불가합니다.
              </p>
              <p></p>
              <p>
                <strong>[제6조 개인정보의 제3자 제공]</strong>
              </p>
              <p>
                회사는 개인정보를 수집할 때 얻은 이용자의 동의 범위를 넘어
                이용자의 정보를 이용하거나 제3자에게 제공하지 않습니다. 다만,
                이용자의 동의가 있거나 다음 각 호의 하나에 해당하는 경우에는
                예외로 합니다.
              </p>
              <p>
                1. 정보통신서비스의 제공에 따른 요금정산을 위하여 필요한 경우
              </p>
              <p>
                2. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
                불가피한 경우
              </p>
              <p></p>
              <p>
                <strong>[제7조 개인정보의 파기 절차 및 방법]</strong>
              </p>
              <p>
                이용자가 입력하신 정보는 목적이 달성된 후 내부 방침 및 기타 관련
                법령에 의한 정보 보호 사유에 따라 일정 기간 동안 저장된 후
                파기됩니다. 전자적 파일 형태로 저장된 개인정보는 기록을 재생할
                수 없는 기술적 방법을 사용하여 삭제합니다.
              </p>
              <p></p>
              <p>
                <strong>[제8조 개인정보의 관리적 보호 대책]</strong>
              </p>
              <p>
                본 전시는 개인정보 보호를 위해 개인정보 보호 책임자를 지정하고
                있습니다. 개인정보와 관련해 문의해 주시면 성심을 다해 답변해
                드리겠습니다.
              </p>
              <p>개인정보 보호 책임자</p>
              <p>성명: 염하지수</p>
              <p>메일: 지수님 메일</p>
              <p>
                이용자는 전시의 서비스를 이용하며 발생하는 모든 개인정보 보호
                관련 민원을 개인정보 보호 책임자 또는 아래 기관의 담당 부서와
                상담, 신고하실 수 있습니다.
              </p>
              <p>개인정보침해신고센터 국번 없이 118 / http://www.118.or.kr</p>
              <p>
                경찰청 사이버테러대응센터 국번 없이 182 /
                http://cyberbureau.police.go.kr
              </p>
              <p>
                대검찰청 사이버범죄수사단 02-3480-3571 / http://www.spo.go.kr
              </p>
              <p></p>
              <p>
                <strong>[제9조 고지의 의무]</strong>
              </p>
              <p>
                이 개인정보처리방침은 2023년 N월 N일부터 적용되며, 변경이 있을
                시에는 변경 사항의 시행 7일 전부터 웹사이트의 공지사항 또는 별도
                공지를 통하여 고지할 것입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovePermissionModalDetailInner;
