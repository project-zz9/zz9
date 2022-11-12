import MarkdownViewer from "~/components/atoms/MarkdownViewer";
import { PermissionPersonalData_Detail } from "~/assets/contents";
import styled from "styled-components";

function ApprovePermissionModalDetailInner() {
  return (
    <MarkdownViewerFrame>
      <MarkdownViewer markdown={PermissionPersonalData_Detail} />
    </MarkdownViewerFrame>
  );
}

export default ApprovePermissionModalDetailInner;

const MarkdownViewerFrame = styled.div`
  @media (max-width: 360px) {
    margin: 3.5vw 3.5vw 0 3.5vw;
  }
  margin: 25px;
`;
