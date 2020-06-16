import { combineReducers } from "redux";
import courseReducers from "./courseReducer";
import toggleUiReducer from "./toggleUiReducer";

export default combineReducers({
  course: courseReducers,
  ui: toggleUiReducer,
});
//this is basically the redux state
