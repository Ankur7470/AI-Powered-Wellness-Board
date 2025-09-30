import axios from "axios";
import { API_KEY, API_ENDPOINT, MODEL_NAME } from "./config.js";

export const fetchLLMResponse = async (schema, userPrompt) => {
  if (!API_KEY) throw new Error("API key missing.");

  const url = `${API_ENDPOINT}${MODEL_NAME}:generateContent?key=${API_KEY}`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;
    const modelContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!modelContent) throw new Error("AI returned no content.");

    try {
      return JSON.parse(modelContent);
    } catch {
      throw new Error("AI output was malformed JSON.");
    }
  } catch (error) {

    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`API Request Failed: ${status} - ${data?.message || error.message}`);
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};
