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
//this calls /posts from jsonplaceholder it is currently not being used but all the pipe work is in place for it
//hence i would suggest using this to fetch DB courses

export const addCourse = (course) => (dispatch) => {
  dispatch({
    type: NEW_COURSE,
    payload: { ...course, id: ++initialId },
  });
};
//this will have to be changed so that it sends courses to DB!!
