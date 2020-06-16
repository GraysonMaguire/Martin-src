import React, { Component } from "react";
import Course from "./course";

import { connect } from "react-redux";
import { fetchCourses } from "../actions/courseActions";

import { getCourses } from "../actions/selectors";

class Courses extends Component {
  componentDidMount() {
    //this.props.fetchCourses();//this should prevent API from running
    console.log(this.props.courses.item);
  }

  render() {
    return (
      <Course
        key={this.props.courses.item.id}
        title={this.props.courses.item.title}
        body={this.props.courses.item.body}
      />
    );
  }
}

export default connect((state) => ({ courses: getCourses(state) }), {
  fetchCourses,
})(Courses);
