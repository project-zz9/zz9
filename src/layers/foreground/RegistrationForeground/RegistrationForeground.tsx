import { useMemo } from "react";
import ForegroundLayer from "../ForegroundLayer";
import Ajv, { JSONSchemaType } from "ajv";
import { useState } from "react";
import { Button } from "@mui/material";
import FormTypeTextInput from "~/components/organizations/FormTypeTextInput/FormTypeTextInput";
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
      label: "이름",
      minLength: 2,
      maxLength: 5,
      nullable: true,
      formType: null,
      props: {
        title: ["방문할 준비를 도와드릴게요.", "이름이 무엇인가요?"],
        subTitle: ["가명이나 닉네임을 써도 괜찮아요."],
      },
    },
    phoneNumber: {
      type: "string",
      label: "전화번호",
      maxLength: 13,
      minLength: 13,
      pattern: "010[-][0-9]{4}[-][0-9]{4}",
      nullable: true,
      formType: null,
      props: {
        title: ["%name%님의", "전화번호를 입력해주세요."],
        subTitle: ["정확한 번호를 입력했는지 확인해주세요."],
      },
      options: {
        format: "phoneNumber",
      },
    },
  },
};

// const validate = ajv.compile(jsonSchema);

const stages = ["name", "phoneNumber"];

// function replacePrefix(line: string, record: Record<string, string>): string {
//   return line.replace(/%[a-zA-Z]*%/, (target) => {
//     return record[target.replace(/%/g, "")] ?? target;
//   });
// }

function RegistrationForeground() {
  const [stage, setStage] = useState<number>(0);
  const [data, setData] = useState<PrimaryData>({});
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
          {/* <div>
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
              onChange={(event) => {
                const value =
                  metaData?.options?.format === "phoneNumber"
                    ? phoneNumber(event.target.value)
                    : event.target.value;
                setData((prev) => ({
                  ...prev,
                  [stages[stage]]: value,
                }));
              }}
              variant="outlined"
              error={!!error}
              helperText={error}
            />
          </div> */}
          <FormTypeTextInput
            name={stages[stage]}
            data={data}
            onChange={setData}
            error={error}
            {...metaData}
          />
          <div>
            <Button
              type="button"
              onClick={() => {
                const result = validate(data);
                if (result) {
                  if (stages.length > stage + 1) {
                    setStage((prev) => prev + 1);
                  } else {
                    console.log("VALIDATE");
                  }
                  setError(null);
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
