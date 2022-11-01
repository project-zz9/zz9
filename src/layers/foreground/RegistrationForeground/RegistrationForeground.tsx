import { useEffect, useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import { JSONSchemaType } from "ajv";
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
import { validator } from "~/utils/validator";
import ConfirmModalInner from "~/components/molecules/ConfirmModalInner";

type VisitorData = {
  name?: string;
  phoneNumber?: string;
  visitDate?: string;
  additional?: string;
};

const jsonSchema: JSONSchemaType<VisitorData> = {
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
    visitDate: {
      type: "string",
      nullable: true,
      formType: null,
    },
    additional: {
      type: "string",
      nullable: true,
      formType: null,
    },
  },
};

const stages = Object.keys(jsonSchema.properties || {});

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(0);
  const [data, setData] = useState<VisitorData>({
    name: "보조개협곡",
    phoneNumber: "010-0000-0000",
  });
  const [error, setError] = useState<string | null>(null);
  const [, setModal] = useAtom(modalControlAtom);
  const navigate = useNavigate();

  const checkCallbackHandlers: Record<string, () => void> = useMemo(
    () => ({
      phoneNumber: () => {
        setModal({
          type: "confirm",
          Element: () => (
            <ConfirmModalInner
              title={[
                [
                  {
                    span: "이름과 전화번호가 맞는지",
                  },
                ],
                [
                  {
                    type: "emphasis",
                    span: "꼼꼼히",
                  },
                  {
                    span: " 확인해주세요 🙏",
                  },
                ],
              ]}
              contents={[
                ...(data.name ? [{ label: "이름", value: data.name }] : []),
                ...(data.phoneNumber
                  ? [{ label: "연락처", value: data.phoneNumber }]
                  : []),
              ]}
            />
          ),
          onSubmit: {
            handler: () => {
              console.log("WOW");
            },
            label: "확인",
          },
          onCancel: {
            handler: () => {
              console.log("IEW");
            },
            label: "수정",
          },
        });
      },
      additional: () => {},
    }),
    [data, setModal]
  );

  const metaData = useMemo(
    () => jsonSchema.properties[stages[stage]] ?? {},
    [stage]
  );
  const validate = useMemo(() => validator.compile(jsonSchema), []);

  useEffect(() => {
    checkCallbackHandlers.phoneNumber();
    return () => {
      stage > 0 && setStage(0);
      // Object.keys(data).length > 0 && setData({});
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
    height:60vw;
    justify-content: space-evenly;
`;

const NextButtonFrame = styledComponent.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    padding-bottom: min(50px, 10vw);
`;
