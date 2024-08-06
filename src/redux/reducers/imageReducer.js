const initialState = {
    url: '',
    error: null,
  };
  
  export default function imageReducer(state = initialState, action) {
    switch (action.type) {
      case 'GENERATE_IMAGE_SUCCESS':
        return { ...state, url: action.payload };
      case 'GENERATE_IMAGE_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }
  