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
import ConfirmPersonalDataModalInner from "~/components/organizations/ConfirmPersonalDataModalInner";

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
      formType: "date-input",
      props: {
        title: ["언제 방문하실 예정인가요?"],
      },
    },
    additional: {
      type: "string",
      nullable: true,
      formType: "additional-input",
      props: {
        title: ["지수의 지구 방문이", "확정되었어요!"],
        subTitle: [
          [{ span: "이제 지수의 지구를 밝힐" }],
          [
            { type: "emphasis", span: "소중한 당신의 별" },
            { span: " 을 만들어 볼게요 ✨" },
          ],
        ],
        distance: {
          label: "당신과 지수의 거리는 얼마큼 인가요?",
          enum: [
            {
              value: "10cm",
              description: "서로 안아줄 수 있는 사이",
            },
            {
              value: "50cm",
              description: "함께 걸을 수 있는 사이",
            },
            {
              value: "1m",
              description: "웃을 수 있는 사이",
            },
          ],
        },
        stars: {
          label: "원하는 별 모양을 선택해주세요.",
          enum: [
            {
              value: "star1",
            },
            {
              value: "star2",
            },
            {
              value: "star3",
            },
            {
              value: "star4",
            },
            {
              value: "star5",
            },
            {
              value: "star6",
            },
          ],
        },
      },
      options: {},
    },
  },
};

const stages = Object.keys(jsonSchema.properties || {});

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(2);
  const [data, setData] = useState<VisitorData>({});
  const [error, setError] = useState<string | null>(null);
  const [, setModal] = useAtom(modalControlAtom);
  const navigate = useNavigate();

  const checkCallbackHandlers: Record<string, () => void> = useMemo(
    () => ({
      phoneNumber: () => {
        setModal({
          type: "confirm",
          Element: () => (
            <ConfirmPersonalDataModalInner
              name={data.name}
              phoneNumber={data.phoneNumber}
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
