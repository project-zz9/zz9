import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import DistanceRadioInput from "~/components/molecules/DistanceRadioInput";
import MultiLineText from "~/components/molecules/MultiLineText";
import StarRadioInput from "~/components/molecules/StarRadioInput";
import { getKey } from "~/utils/crypto";
import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeRelationshipInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {
    title: EmphasisTextForm[];
    subTitle: EmphasisTextForm[];
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
  onChange,
  props,
}: IFormTypeRelationshipInputProps) {
  const [distance, setDistance] = useState<string>("");
  const [star, setStar] = useState<string>("");

  useEffect(() => {
    if (distance && star) {
      onChange((prev) => ({
        ...prev,
        [name]: getKey(distance, star),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, star]);

  const { subTitle, distance: distanceProps, stars: starsProps } = props || {};

  return (
    <Fragment>
      <TitleFrame />
      {subTitle && (
        <MultiLineText lines={subTitle || []} size="1.2rem" color="#fff" />
      )}
      <DistanceRadioInputFrame>
        <DistanceRadioInput
          title={distanceProps?.title}
          options={distanceProps?.options}
          data={distance}
          setData={setDistance}
        />
      </DistanceRadioInputFrame>
      <StarRadioInputFrame>
        <StarRadioInput
          title={starsProps?.title}
          options={starsProps?.options}
          data={star}
          setData={setStar}
        />
      </StarRadioInputFrame>
    </Fragment>
  );
}

export default FormTypeRelationshipInput;

const TitleFrame = styled.div`
  margin: 0.5rem;
`;

const DistanceRadioInputFrame = styled.div`
  margin-top: 2rem;
`;

const StarRadioInputFrame = styled.div``;
