import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

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

