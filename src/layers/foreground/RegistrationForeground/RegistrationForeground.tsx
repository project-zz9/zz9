import { useEffect, useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import styledComponent from "styled-components";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import SchemaForm from "~/components/organizations/SchemaForm";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { validator } from "~/utils/validator";
import { jsonSchema, VisitorData } from "~/app/jsonSchema";
import { useCheckCallbackHandlers } from "./useCheckCallbackHandlers";

const stages = Object.keys(jsonSchema.properties || {});

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(2);
  const [data, setData] = useState<VisitorData>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkCallbackHandlers = useCheckCallbackHandlers(data);
  const metaData = useMemo(
    () => jsonSchema.properties[stages[stage]] ?? {},
    [stage]
  );
  const validate = useMemo(() => validator.compile(jsonSchema), []);

  useEffect(() => {
    return () => {
      // stage > 0 && setStage(0);
      // Object.keys(data).length > 0 && setData({});
      // error && setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ForegroundLayer>
      {metaData && (
        <RootFrame>
          <GoBackButtonFrame>
            <IconButton
              aria-label="go-back"
              size="large"
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
                  navigate(HOME_PATH);
                }
              }}
            >
              <ArrowBack />
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
              disabled={!(data as any)[stages[stage]]}
              onClick={() => {
                const result = validate(data);
                if (result) {
                  if (checkCallbackHandlers[stages[stage]]) {
                    checkCallbackHandlers[stages[stage]]();
                  } else {
                    stages.length > stage + 1 && setStage((prev) => prev + 1);
                  }
                  setError(null);
                } else {
                  setError(validate.errors?.[0].message || null);
                }
              }}
            >
              다음으로
            </MonotonicButton>
          </NextButtonFrame>
        </RootFrame>
      )}
    </ForegroundLayer>
  );
}

export default RegistrationForeground;

const RootFrame = styledComponent.div`
    display: flex;
    width: 80vw;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
`;

const GoBackButtonFrame = styledComponent.div`
    margin-bottom: 20px;
    margin-left: -30px;
`;

const SchemaFormFrame = styledComponent.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const NextButtonFrame = styledComponent.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    padding-bottom: min(50px, 10vw);
`;
