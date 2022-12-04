import { useCallback, useEffect, useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowRight } from "react-feather";
import styledComponent, { css } from "styled-components";
import SchemaForm from "~/components/organizations/SchemaForm";
import { useHistory } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { validator } from "~/utils/validator";
import { jsonSchema } from "~/app/jsonSchema";
import { useCheckCallbackHandlers } from "./useCheckCallbackHandlers";
import { useAtom } from "jotai";
import { permissionAtom, PERSONAL_DATA } from "~/stores/permission";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useModalBlocker } from "~/hooks/useModalBlocker";
import { shakeX } from "~/assets/styles/keyframes";

const stages = Object.keys(jsonSchema.properties || {});

interface IRegistrationForegroundProps {
  changeColorHandler: (
    color:
      | (ColorCode | undefined)
      | ((prev: ColorCode | undefined) => ColorCode | undefined)
  ) => void;
}

function RegistrationForeground({
  changeColorHandler,
}: IRegistrationForegroundProps) {
  const [permission] = useAtom(permissionAtom);
  const [stage, setStage] = useState<number>(0);
  const [data, setData] = useState<VisitorData>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const hasNextStage = useMemo(() => stages.length > stage + 1, [stage]);
  const preventGoNext = useMemo(
    () => loading || !(data as any)[stages[stage]],
    [data, loading, stage]
  );

  const goNextStage = useCallback(() => {
    if (hasNextStage) {
      setStage((prev) => prev + 1);
    }
  }, [hasNextStage]);

  const checkCallbackHandlers = useCheckCallbackHandlers(
    data,
    goNextStage,
    history
  );
  const metaData = useMemo(
    () => jsonSchema.properties[stages[stage]] ?? {},
    [stage]
  );
  const color = stage < 3 ? "light" : "dark";
  const validate = useMemo(() => validator.compile(jsonSchema), []);

  useEffect(() => {
    if (!permission[PERSONAL_DATA]) {
      history.replace(HOME_PATH);
    }
    return () => {
      stage > 0 && setStage(0);
      Object.keys(data).length > 0 && setData({});
      error && setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeColorHandler(color === "light" ? "#fff" : "#000");
  }, [changeColorHandler, color]);

  useModalBlocker(() => {
    if (stage > 0) {
      setStage((prev) => prev - 1);
      setData((prev) =>
        Object.entries(prev || {}).reduce((accumulator, [key, value]) => {
          if (stages.indexOf(key) < stage && value) {
            accumulator[key] = value;
          }
          return accumulator;
        }, {} as Record<string, string>)
      );
      setError(null);
      return false;
    }
    return true;
  });

  return (
    <ForegroundLayer>
      <TransitionGroup>
        <CSSTransition key={stage} classNames="fade-tab" timeout={500}>
          {metaData && (
            <RootFrame>
              <TopButtonGroupFrame>
                <IconButton
                  aria-label="go-back"
                  onClick={() => {
                    if (stage > 0) {
                      setStage((prev) => prev - 1);
                      setData((prev) =>
                        Object.entries(prev || {}).reduce(
                          (accumulator, [key, value]) => {
                            if (stages.indexOf(key) < stage && value) {
                              accumulator[key] = value;
                            }
                            return accumulator;
                          },
                          {} as Record<string, string>
                        )
                      );
                      setError(null);
                    } else {
                      history.goBack();
                    }
                  }}
                >
                  <ButtonText color={color === "light" ? "#555" : "#fff"}>
                    이전
                  </ButtonText>
                </IconButton>
                <IconButton
                  aria-label="go-back"
                  disabled={preventGoNext}
                  onClick={() => {
                    const result = validate(data);
                    if (result) {
                      if (checkCallbackHandlers[stages[stage]]) {
                        setLoading(checkCallbackHandlers[stages[stage]]());
                      } else {
                        goNextStage();
                      }
                      setError(null);
                    } else {
                      setError(metaData?.errorMessage || null);
                    }
                  }}
                >
                  {hasNextStage ? (
                    <AnimatedIconFrame active={!preventGoNext}>
                      <ArrowRight />
                    </AnimatedIconFrame>
                  ) : (
                    <ButtonText color={preventGoNext ? "#444" : "#FF5A0D"}>
                      {loading ? "Wait" : "완료"}
                    </ButtonText>
                  )}
                </IconButton>
              </TopButtonGroupFrame>
              <SchemaFormFrame>
                <SchemaForm
                  name={stages[stage]}
                  data={data}
                  onChange={setData}
                  error={error}
                  jsonSchema={metaData}
                />
              </SchemaFormFrame>
            </RootFrame>
          )}
        </CSSTransition>
      </TransitionGroup>
    </ForegroundLayer>
  );
}

export default RegistrationForeground;

const RootFrame = styledComponent.div`
    display: flex;
    width: 80vw;
    flex-direction: column;
    justify-content: flex-start;
`;

const TopButtonGroupFrame = styledComponent.div`
    margin: 1rem -1.5rem 1rem -1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width:2.1rem;
      height:2.1rem;
    }
`;

const AnimatedIconFrame = styledComponent.div<{ active?: boolean }>`
    ${({ active }) =>
      active
        ? css`
            color: #ff5a0d;
            animation: ${shakeX} 0.5s infinite linear alternate;
          `
        : css`
            color: #bbb;
          `}
`;

const SchemaFormFrame = styledComponent.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const ButtonText = styledComponent.span<{ color?: ColorCode }>`
    color: ${({ color }) => color};
    font-size:1.2rem;
    font-weight: bold;
`;
