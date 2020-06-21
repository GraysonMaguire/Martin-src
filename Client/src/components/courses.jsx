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
    return (
      <Course
        key={this.props.courses.items.id}
        title={this.props.courses.items.title}
        body={this.props.courses.items.body}
      />
    );
  }
}

export default connect((state) => ({ courses: getCourses(state) }), {
  fetchCourses,
})(Courses);
