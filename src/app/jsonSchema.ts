import type { JSONSchemaType } from "ajv";

export const jsonSchema: JSONSchemaType<VisitorData> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      label: "가명이나 닉네임을 써도 괜찮아요.",
      minLength: 1,
      maxLength: 10,
      nullable: true,
      errorMessage: "이름은 10글자 이내로 해주세요.",
      formType: "text-input",
      props: {
        title: [
          [{ value: "방문할 준비를 도와드릴게요." }],
          [{ value: "이름이 무엇인가요?" }],
        ],
      },
    },
    phoneNumber: {
      type: "string",
      label: "정확한 번호를 입력했는지 확인해주세요.",
      maxLength: 13,
      minLength: 13,
      pattern: "010[-][0-9]{4}[-][0-9]{4}",
      nullable: true,
      errorMessage: "'010-XXXX-XXXX' 형식으로 입력해주세요",
      formType: "text-input",
      props: {
        title: [
          [{ value: "%name%님의" }],
          [{ value: "전화번호를 입력해주세요." }],
        ],
      },
      options: {
        format: "phoneNumber",
      },
    },
    visitTime: {
      type: "string",
      pattern: "[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:00",
      nullable: true,
      formType: "date-input",
      props: {
        title: [[{ value: "언제 방문하실 예정인가요?" }]],
        date: {
          title: "방문 일을 선택해주세요 :)",
          options: [
            {
              label: "2022년 11월 15일",
              value: "2022-11-15",
            },
            {
              label: "2022년 11월 16일",
              value: "2022-11-16",
            },
            {
              label: "2022년 11월 17일",
              value: "2022-11-17",
            },
          ],
        },
        time: {
          title: "방문 시간을 선택해주세요 :)",
          options: [
            {
              label: "10시",
              value: "10:00",
            },
            {
              label: "12시",
              value: "12:00",
            },
            {
              label: "14시",
              value: "14:00",
            },
            {
              label: "16시",
              value: "16:00",
            },
          ],
        },
        options: {},
      },
    },
    relationship: {
      type: "string",
      nullable: true,
      formType: "relationship-input",
      props: {
        title: [
          [{ value: "지수의 지구 방문이" }],
          [{ value: "확정되었어요!" }],
        ],
        subTitle: [
          [{ value: "이제 지수의 지구를 밝힐" }],
          [
            { type: "emphasis", value: "소중한 당신의 별" },
            { value: " 을 만들어 볼게요 ✨" },
          ],
        ],
        distance: {
          title: "당신과 지수의 거리는 얼마큼 인가요?",
          options: [
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
              description: "함께 웃을 수 있는 사이",
            },
          ],
        },
        stars: {
          title: "원하는 별 모양을 선택해주세요.",
          options: [
            {
              value: "card1",
            },
            {
              value: "card2",
            },
            {
              value: "card3",
            },
            {
              value: "card4",
            },
            {
              value: "card5",
            },
            {
              value: "card6",
            },
          ],
        },
      },
      options: {},
    },
  },
};
