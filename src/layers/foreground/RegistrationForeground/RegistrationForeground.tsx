import { useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import Ajv, { JSONSchemaType } from "ajv";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
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
      minLength: 5,
      maxLength: 20,
      nullable: true,
      formType: null,
      props: {
        title: ["방문할 준비를 도와드릴게요.", "이름이 무엇인가요?"],
        subTitle: ["가명이나 닉네임을 써도 괜찮아요."],
      },
    },
    phoneNumber: {
      type: "string",
      maxLength: 13,
      minLength: 13,
      pattern: "010[-][0-9]{4}[-][0-9]{4}",
      nullable: true,
      formType: null,
      props: {
        title: ["%name%님의", "전화번호를 입력해주세요."],
        subTitle: ["정확한 번호를 입력했는지 확인해주세요."],
      },
    },
  },
};

// const validate = ajv.compile(jsonSchema);

const stages = ["name", "phoneNumber"];

function replacePrefix(line: string, record: Record<string, string>): string {
  return line.replace(/%[a-zA-Z]*%/, (target) => {
    return record[target.replace(/%/g, "")] ?? target;
  });
}

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const metaData = useMemo(
    () => jsonSchema.properties[stages[stage]] ?? {},
    [stage]
  );
  const validate = useMemo(() => ajv.compile(jsonSchema), []);

  return (
    <ForegroundLayer>
      {metaData && (
        <div
          style={{
            display: "flex",
            width: "80vw",
            height: "50vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            {Array.isArray(metaData?.props?.title) &&
              metaData.props.title
                .map((line: string) => replacePrefix(line, data))
                .map((line: string, index: number) => (
                  <div key={`${index}::${line}`}>{line}</div>
                ))}
          </div>
          <div>
            {Array.isArray(metaData?.props?.subTitle) &&
              metaData.props.subTitle
                .map((line: string) => replacePrefix(line, data))
                .map((line: string, index: number) => (
                  <div key={`${index}::${line}`}>{line}</div>
                ))}
          </div>
          <div>
            <TextField
              key={`TextField::${stages[stage]}`}
              label={stages[stage]}
              onChange={(event) =>
                setData((prev) => ({
                  ...prev,
                  [stages[stage]]: event.target.value,
                }))
              }
              variant="outlined"
              error={!!error}
              helperText={error}
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={() => {
                const result = validate(data);
                if (result) {
                  if (stages.length > stage + 1) {
                    setError(null);
                    setStage((prev) => prev + 1);
                  } else {
                    console.log("VALIDATE");
                  }
                } else {
                  setError(validate.errors?.[0].message || null);
                }
              }}
            >
              {stages.length > stage + 1 ? "NEXT" : "END"}
            </Button>
          </div>
        </div>
      )}
    </ForegroundLayer>
  );
}

export default RegistrationForeground;
