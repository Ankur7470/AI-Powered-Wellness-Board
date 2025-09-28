export const TIPS_SCHEMA = {
  type: "object",
  properties: {
    tips: {
      type: "array",
      description: "An array containing exactly 5 personalized wellness tips.",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          icon: { type: "string" },
          summary: { type: "string" }
        },
        required: ["id", "title", "icon", "summary"],
      },
      minItems: 5,
      maxItems: 5,
    },
  },
  required: ["tips"],
};

export const DETAIL_SCHEMA = {
  type: "object",
  properties: {
    explanation: { type: "string" },
    steps: {
      type: "array",
      items: { type: "string" },
      minItems: 4,
    },
  },
  required: ["explanation", "steps"],
};
