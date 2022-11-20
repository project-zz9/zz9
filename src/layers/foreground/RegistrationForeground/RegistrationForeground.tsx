import { useCallback, useEffect, useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowLeft } from "react-feather";
import styledComponent from "styled-components";
import MonotonicButton from "~/components/atoms/MonotonicButton";
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

  const goNextStage = useCallback(() => {
    if (stages.length > stage + 1) {
      setStage((prev) => prev + 1);
    } else {
    }
  }, [stage]);

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
      history.push(HOME_PATH);
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
        <CSSTransition key={stage} classNames="fade" timeout={500}>
          {metaData && (
            <RootFrame>
              <GoBackButtonFrame>
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
                  <ArrowLeft color={color === "light" ? "#000" : "#fff"} />
                </IconButton>
              </GoBackButtonFrame>
              <SchemaFormFrame>
                <SchemaForm
                  name={stages[stage]}
                  data={data}
                  onChange={setData}
                  error={error}
                  jsonSchema={metaData}
                />
              </SchemaFormFrame>
              <NextButtonFrame>
                <MonotonicButton
                  disabled={loading || !(data as any)[stages[stage]]}
                  color={color === "light" ? "inherit" : "primary"}
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
                      setError(validate.errors?.[0].message || null);
                    }
                  }}
                >
                  {loading ? "Loading..." : "다음으로"}
                </MonotonicButton>
              </NextButtonFrame>
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
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
`;

const GoBackButtonFrame = styledComponent.div`
    margin-top:20px;
    margin-left:-20px;
    margin-bottom:1rem;
    svg {
      width:32px;
      height:32px;
    }
`;

const SchemaFormFrame = styledComponent.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const NextButtonFrame = styledComponent.div`
    margin-top: min(30rem, 10vw);
`;
