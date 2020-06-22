import { FETCH_COURSES, ADD_COURSE } from "../actions/types";

const initialState = {
  items: [],
  item: [],
};
let initialId = 0;
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, items: action.payload };
    case ADD_COURSE: {
      return { ...state, item: action.payload };
    }

    default:
      return state;
  }
}
