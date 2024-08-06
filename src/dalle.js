import axios from 'axios';

const OPENAI_API_KEY = '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';

export const generateDalleImage = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error.message : error.message);
  }
};

