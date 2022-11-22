import { Fragment } from "react";
import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import GuestbookForeground from "~/layers/foreground/GuestbookForeground";

function Guestbook() {
  const { uuid } = useParams<{ uuid: string }>();
  return (
    <Fragment>
      <GuestbookForeground uuid={uuid} />
      <MonotonicBackground color="#fff" />
    </Fragment>
  );
}

export default Guestbook;
