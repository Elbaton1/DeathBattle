const initialState = {
    commentary: '',
    error: null,
  };
  
  export default function commentaryReducer(state = initialState, action) {
    switch (action.type) {
      case 'GENERATE_COMMENTARY_SUCCESS':
        return { ...state, commentary: action.payload };
      case 'GENERATE_COMMENTARY_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }
  