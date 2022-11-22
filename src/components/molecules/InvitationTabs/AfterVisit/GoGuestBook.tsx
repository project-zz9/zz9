import { Fragment } from "react";
import styled from "styled-components";
import { Guestbook } from "~/assets/images";
import EmphasisText from "~/components/atoms/EmphasisText";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import MultiLineText from "~/components/molecules/MultiLineText";

interface IGoGuestBookProps {
  goGuestbookHandler: () => void;
}

function GoGuestBook({ goGuestbookHandler }: IGoGuestBookProps) {
  return (
    <Fragment>
      <Title>
        <EmphasisText
          text={[{ value: "방명록" }]}
          size="1.4rem"
          color="#FFF"
          weight="bold"
        />
      </Title>
      <Description>
        <MultiLineText
          lines={[
            [
              {
                value: "지수의 지구에 방문한",
              },
            ],
            [
              {
                value: "당신의 이야기를 나눠 지수의 우주를 밝혀주세요.",
              },
            ],
          ]}
          size="0.9rem"
          color="#FFF"
        />
      </Description>
      <PositionAnchor>
        <ImageFrame>
          <img src={Guestbook} alt="go guestbook" />
        </ImageFrame>
      </PositionAnchor>
      <MonotonicButton
        type="contained"
        color="secondary"
        onClick={goGuestbookHandler}
      >
        별 띄우러가기
      </MonotonicButton>
    </Fragment>
  );
}

export default GoGuestBook;

const Title = styled.div`
  margin-bottom: 1rem;
`;
const Description = styled.div`
  div {
    margin-bottom: 0.2rem;
  }
`;

const PositionAnchor = styled.div`
  position: relative;
  height: 35vw;
`;
const ImageFrame = styled.div`
  position: absolute;
  top: -22.5vw;
  width: 80vw;
  height: 80vw;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
