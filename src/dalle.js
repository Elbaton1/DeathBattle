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

