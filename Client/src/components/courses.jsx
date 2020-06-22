import React, { Component } from "react";
import Course from "./course";

import { connect } from "react-redux";
import { fetchCourses } from "../actions/courseActions";

import { getCourses } from "../actions/selectors";

class Courses extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    const courseItems = this.props.courses.items.map((course) => (
      <Course key={course.id} title={course.title} body={course.body} />
    ));
    return <div>{courseItems}</div>;
  }
}

export default connect((state) => ({ courses: getCourses(state) }), {
  fetchCourses,
})(Courses);
