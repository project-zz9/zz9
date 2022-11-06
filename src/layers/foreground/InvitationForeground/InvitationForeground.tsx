import { Button, IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "react-feather";
import styled from "styled-components";
import EmphasisText from "~/components/atoms/EmphasisText";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { cards, cardShadow, logos } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { Fragment, useMemo } from "react";
import { SEPARATOR } from "~/app/constant";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";
import MultiLineText from "~/components/molecules/MultiLineText";
import InvitationPortal from "~/components/organizations/InvitationPortal";

interface IInvitationForegroundProps {
  uuid: string | undefined;
}

const visitor = {
  name: "보조개협곡",
  phoneNumber: "010-9123-1241",
  visitTime: "2023-04-28 14:00",
  relationship: "10cm::card3",
};

const [distance, star] = visitor.relationship.split(SEPARATOR);

const uuid = "052aaec3edadce4579f648d4f4ee7d840d950b22";

function InvitationForeground({ uuid }: IInvitationForegroundProps) {
  const navigate = useNavigate();
  const [, setModal] = useAtom(modalControlAtom);

  // const visitor = useQuery<VisitorData>(
  //   { collection: "visitor", method: "get" },
  //   uuid
  // );

  // const [distance, star] = useMemo(
  //   () => (visitor?.relationship ? visitor.relationship.split(SEPARATOR) : []),
  //   [visitor]
  // );

  return (
    <ForegroundLayer>
      <RootFrame>
        <InvitationPortal visitor={visitor} />
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationForeground;

const RootFrame = styled.div`
  display: flex;
  width: 80vw;
  height: 85vh;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 12.5vh;
`;
