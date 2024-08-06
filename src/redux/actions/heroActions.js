import axios from 'axios';

const SUPERHERO_API_KEY = process.env.REACT_APP_SUPERHERO_API_KEY;

export const fetchHero = (heroId, id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://superheroapi.com/api/${SUPERHERO_API_KEY}/${heroId}`);
    dispatch({ type: 'FETCH_HERO_SUCCESS', payload: { id, data: response.data } });
  } catch (error) {
    dispatch({ type: 'FETCH_HERO_FAILURE', payload: error.message });
  }
};
