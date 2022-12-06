import { PermissionPersonalData_Detail } from "~/assets/contents";
import styled from "styled-components";
import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const MarkdownViewer = lazy(() => import("~/components/atoms/MarkdownViewer"));

function ApprovePermissionModalDetailInner() {
  return (
    <MarkdownViewerFrame>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <MarkdownViewer markdown={PermissionPersonalData_Detail} />
      </Suspense>
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
