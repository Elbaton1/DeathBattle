import { combineReducers } from 'redux';
import heroReducer from './heroReducer';
import commentaryReducer from './commentaryReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  hero: heroReducer,
  commentary: commentaryReducer,
  image: imageReducer,
});
