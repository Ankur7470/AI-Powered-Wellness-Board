import { API_KEY, API_ENDPOINT, MODEL_NAME } from './config.js';

export const fetchLLMResponse = async (schema, userPrompt) => {
  if (!API_KEY) throw new Error("API key missing.");

  const url = `${API_ENDPOINT}${MODEL_NAME}:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(`API Request Failed: ${response.status} - ${errorBody.message || response.statusText}`);
  }

  const data = await response.json();
  const modelContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!modelContent) throw new Error("AI returned no content.");

  try {
    return JSON.parse(modelContent);
  } catch {
    throw new Error("AI output was malformed JSON.");
  }
};
