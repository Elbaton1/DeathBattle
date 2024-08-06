import { generateDalleImage } from '../../dalle';

export const generateImage = (hero1, hero2) => async (dispatch) => {
  try {
    const prompt = `A detailed illustration of a battle between ${hero1.name} and ${hero2.name}, showcasing their powers in action.`;
    const imageUrl = await generateDalleImage(prompt);
    dispatch({ type: 'GENERATE_IMAGE_SUCCESS', payload: imageUrl });
  } catch (error) {
    dispatch({ type: 'GENERATE_IMAGE_FAILURE', payload: error.message });
  }
};
