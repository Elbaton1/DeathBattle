const initialState = {
    hero1: null,
    hero2: null,
    error: null,
  };
  
  export default function heroReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_HERO_SUCCESS':
        return { ...state, [action.payload.id]: action.payload.data };
      case 'FETCH_HERO_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }
  