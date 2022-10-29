import { useEffect, useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import Ajv, { JSONSchemaType } from "ajv";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import styledComponent from "styled-components";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import SchemaForm from "~/components/organizations/SchemaForm";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";

const ajv = new Ajv({ strictSchema: false });

type PrimaryData = {
  name?: string;
  phoneNumber?: string;
};

const jsonSchema: JSONSchemaType<PrimaryData> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      label: "가명이나 닉네임을 써도 괜찮아요.",
      minLength: 2,
      maxLength: 20,
      nullable: true,
      formType: "text-input",
      props: {
        title: ["방문할 준비를 도와드릴게요.", "이름이 무엇인가요?"],
      },
    },
    phoneNumber: {
      type: "string",
      label: "정확한 번호를 입력했는지 확인해주세요.",
      maxLength: 13,
      minLength: 13,
      pattern: "010[-][0-9]{4}[-][0-9]{4}",
      nullable: true,
      formType: "text-input",
      props: {
        title: ["%name%님의", "전화번호를 입력해주세요."],
      },
      options: {
        format: "phoneNumber",
      },
    },
  },
};

const stages = Object.keys(jsonSchema.properties || {});

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(0);
  const [data, setData] = useState<PrimaryData>({});
  const [error, setError] = useState<string | null>(null);
  const [, setModal] = useAtom(modalControlAtom);
  const navigate = useNavigate();

  const metaData = useMemo(
    () => jsonSchema.properties[stages[stage]] ?? {},
    [stage]
  );
  const validate = useMemo(() => ajv.compile(jsonSchema), []);

  useEffect(() => {
    return () => {
      stage > 0 && setStage(0);
      Object.keys(data).length > 0 && setData({});
      error && setError(null);
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
              onClick={() => {
                const result = validate(data);
                if (result) {
                  if (stages.length > stage + 1) {
                    setStage((prev) => prev + 1);
                  } else {
                    setModal({
                      type: "confirm",
                      Element: () => <div>TEST</div>,
                      onSubmit: {
                        label: "확인",
                      },
                      onCancel: {
                        label: "수정",
                      },
                    });
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
    height:60vw;
    justify-content: space-evenly;
`;

const NextButtonFrame = styledComponent.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    padding-bottom: min(50px, 10vw);
`;
