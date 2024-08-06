import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const generateCommentary = (hero1, hero2) => async (dispatch) => {
  try {
    const prompt = `Generate a detailed battle commentary between ${hero1.name} and ${hero2.name}, including their strengths and weaknesses, and who would win the fight.`;
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt,
        max_tokens: 200,
        model: 'text-davinci-003',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    dispatch({ type: 'GENERATE_COMMENTARY_SUCCESS', payload: response.data.choices[0].text });
  } catch (error) {
    dispatch({ type: 'GENERATE_COMMENTARY_FAILURE', payload: error.message });
  }
};
