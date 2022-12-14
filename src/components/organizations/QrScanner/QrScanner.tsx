import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { lazy, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { updateVisitorVisited } from "~/api/visitor";
import ContentTable, { TableContent } from "~/components/atoms/ContentTable";
import ViewFinder from "~/components/atoms/ViewFinder";
import { useQuery } from "~/hooks/useQuery";
import { modalControlAtom, modalVisibilityAtom } from "~/stores/modal";
import ConfirmVisitorModalInner from "../ConfirmVisitorModalInner";

const QrScannerInput = lazy(() => import("~/components/atoms/QrScannerInput"));

const MAX_HISTORY = 10;

function QrScanner() {
  const [data, setData] = useState<string>("");
  const [history, setHistory] = useState<TableContent[]>([]);
  const [, setModal] = useAtom(modalControlAtom);
  const [modalVisibility] = useAtom(modalVisibilityAtom);

  const visitor = useQuery<VisitorData>({ collection: "visitor" }, data);

  useEffect(() => {
    if (!visitor || modalVisibility) return;
    setModal({
      type: "confirm",
      Element: () => <ConfirmVisitorModalInner {...visitor} />,
      onSubmit: {
        label: "승인",
        handler: () => {
          updateVisitorVisited(data).then(() => {
            setHistory((prev) => [
              {
                label: visitor.name || "unknown",
                value: visitor.phoneNumber || "No Data",
              },
              ...(prev.length + 1 > MAX_HISTORY
                ? prev.slice(0, prev.length - 1)
                : prev),
            ]);
          });
        },
      },
      onCancel: {
        label: "거절",
      },
      clean: () => {
        setData("");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitor, setModal]);

  return (
    <RootFrame>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <QrScannerInput setData={setData} ViewFinder={ViewFinder} />
      </Suspense>
      <TableFrame>
        <ContentTable contents={history} />
      </TableFrame>
    </RootFrame>
  );
}

export default QrScanner;

const RootFrame = styled.div`
  width: 95vw;
`;

const TableFrame = styled.div`
  padding-top: 1rem;
  width: 80vw;
  margin: 0 auto;
  td {
    color: white;
  }
`;
