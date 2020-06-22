import { FETCH_COURSES, ADD_COURSE } from "./types";
import axios from "axios";

export const fetchCourses = () => (dispatch) => {
  axios
    .get("/courses")
    .then((res) => res.data)
    .then((courses) =>
      dispatch({
        type: FETCH_COURSES,
        payload: courses,
      })
    )
    .catch((err) => console.log(err));
};

export const addCourse = (course) => (dispatch) => {
  axios
    .post("/courses/newCourse", {
      title: course.title,
      body: course.body,
      draft: false,
    })
    .then((res) => res.data)
    .then((course) =>
      dispatch({
        type: ADD_COURSE,
        payload: { ...course },
      })
    )
    .then(() => dispatch(fetchCourses()))
    .catch((err) => console.log(err));
};
