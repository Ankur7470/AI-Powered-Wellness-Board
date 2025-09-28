import { TIPS_SCHEMA, DETAIL_SCHEMA } from './schemas.js';
import { constructTipsPrompt, constructDetailPrompt } from './prompts.js';
import { fetchLLMResponse } from './api.js';

export const generateTips = async (profile) => {
  const prompt = constructTipsPrompt(profile);
  const jsonResponse = await fetchLLMResponse(TIPS_SCHEMA, prompt);

  if (!jsonResponse.tips || jsonResponse.tips.length !== 5) {
    throw new Error("AI returned incorrect tip count.");
  }

  return jsonResponse.tips;
};

export const getTipDetail = async (tipContext) => {
  const prompt = constructDetailPrompt(tipContext);
  const jsonResponse = await fetchLLMResponse(DETAIL_SCHEMA, prompt);

  if (!jsonResponse.explanation || !jsonResponse.steps) {
    throw new Error("AI returned incomplete detail information.");
  }

  return jsonResponse;
};
