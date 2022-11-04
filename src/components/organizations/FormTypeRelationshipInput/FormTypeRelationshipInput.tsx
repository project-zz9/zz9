import { useMemo, useState } from "react";
import styled from "styled-components";
import { logos } from "~/assets/icons";
import EmphasisText, {
  EmphasisTextForm,
} from "~/components/atoms/EmphasisText";
import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeRelationshipInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {
    title: EmphasisTextForm;
    subTitle: EmphasisTextForm;
    distance: {
      title: string;
      options: { value: string; description: string }[];
    };
    stars: {
      title: string;
      options: { value: string }[];
    };
  };
}

function FormTypeRelationshipInput({
  name,
  data,
  onChange,
  label,
  error,
  props,
}: IFormTypeRelationshipInputProps) {
  const [distance, setDistance] = useState<string>("");
  const [star, setStar] = useState<string>("");

  const {
    title,
    subTitle,
    distance: distanceProps,
    stars: starsProps,
  } = props || {};

  return (
    <div>
      <TitleFrame>
        <Title>
          <EmphasisText title={title || []} size="1.5rem" weight="bold" />
        </Title>
        <LogoIcon src={logos.IconWhite} alt="logo" />
      </TitleFrame>
      <EmphasisText title={subTitle || []} size="1.2rem" />
    </div>
  );
}

export default FormTypeRelationshipInput;

const TitleFrame = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LogoIcon = styled.img`
  margin-top: 20px;
  width: 4rem;
  object-fit: contain;
`;
