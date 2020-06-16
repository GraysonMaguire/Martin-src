import { TOGGLE_CREATE_COURSE, TOGGLE_DISPLAY_COURSE } from "./types";

export const toggleCourseCreate = (ui) => (dispatch) => {
  dispatch({
    type: TOGGLE_CREATE_COURSE,
    payload: ui,
  });
};

export const toggleCourseDisplay = (ui) => (dispatch) => {
  dispatch({
    type: TOGGLE_DISPLAY_COURSE,
    payload: ui,
  });
};
