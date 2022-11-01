import type { JSONSchemaType } from "ajv";

export type VisitorData = {
  name?: string;
  phoneNumber?: string;
  visitDate?: string;
  additional?: string;
};

export const jsonSchema: JSONSchemaType<VisitorData> = {
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
        date: {
          label: "방문 일을 선택해주세요 :)",
          enum: [
            {
              name: "2023년 4월 28일",
              value: "2023-04-28",
            },
            {
              name: "2023년 4월 29일",
              value: "2023-04-29",
            },
            {
              name: "2023년 4월 30일",
              value: "2023-04-30",
            },
          ],
        },
        time: {
          label: "방문 시간을 선택해주세요 :)",
          enum: [
            {
              name: "10시",
              value: "10:00",
            },
            {
              name: "12시",
              value: "12:00",
            },
            {
              name: "14시",
              value: "14:00",
            },
            {
              name: "16시",
              value: "16:00",
            },
          ],
        },
        options: {},
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
