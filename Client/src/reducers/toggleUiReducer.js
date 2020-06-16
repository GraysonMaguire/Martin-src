import { TOGGLE_CREATE_COURSE, TOGGLE_DISPLAY_COURSE } from "../actions/types";

const initialState = {
  coursesDisplayed: false,
  courseCreatorDisplayed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DISPLAY_COURSE:
      return { ...state, coursesDisplayed: action.payload };
    case TOGGLE_CREATE_COURSE:
      return { ...state, courseCreatorDisplayed: action.payload };

    default:
      return state;
  }
}
