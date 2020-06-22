import { FETCH_COURSES, NEW_COURSE } from "./types";
let initialId = 0;
export const fetchCourses = () => (dispatch) => {
  fetch("/courses")
    .then((res) => res.json())
    .then((courses) =>
      dispatch({
        type: FETCH_COURSES,
        payload: courses,
      })
    );
};

export const addCourse = (course) => (dispatch) => {
  dispatch({
    type: NEW_COURSE,
    payload: { ...course, id: ++initialId },
  });
};
