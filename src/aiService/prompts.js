import { TIPS_SCHEMA, DETAIL_SCHEMA } from './schemas.js';

export const constructTipsPrompt = (profile) => {
  return `
    You are an expert wellness coach specializing in personalized, concise health recommendations.

    ### INSTRUCTIONS ###
    1. Analyze the user's profile and primary wellness goal provided below.
    2. Generate exactly 5 unique, highly relevant wellness tips.
    3. Do NOT include any introductory or concluding text. Your entire output MUST be a single JSON object.
    4. The JSON output must STRICTLY conform to the provided JSON Schema.

    ### USER PROFILE ###
    Age: ${profile.age}
    Gender: ${profile.gender}
    Goal: ${profile.goal}

    ### JSON SCHEMA ###
    ${JSON.stringify(TIPS_SCHEMA)}
  `;
};

export const constructDetailPrompt = (tipContext) => {
  return `
    You are an expert wellness coach. The user has selected one of your previously generated tips.

    ### INSTRUCTIONS ###
    1. Based ONLY on the selected Tip Context below, generate a comprehensive explanation and step-by-step advice.
    2. The 'explanation' must be a minimum of 300 words.
    3. The 'steps' array must contain at least 4 clear, sequential instructions.
    4. Do NOT include any introductory or concluding text. Your entire output MUST be a single JSON object.
    5. The JSON output must STRICTLY conform to the provided JSON Schema.

    ### TIP CONTEXT ###
    Tip Title: ${tipContext.title}
    Tip Summary: ${tipContext.summary}

    ### JSON SCHEMA ###
    ${JSON.stringify(DETAIL_SCHEMA)}
  `;
};


