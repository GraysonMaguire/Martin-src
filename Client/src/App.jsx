import React, { Component } from "react";
import CourseCreator from "./components/courseCreator";
import Courses from "./components/courses";
import "./App.css";
import { connect } from "react-redux";
import { getUi } from "./actions/selectors";
import { toggleCourseCreate, toggleCourseDisplay } from "./actions/uiActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleCourseDisplayed = this.toggleCourseDisplayed.bind(this);
    this.toggleCourseCreator = this.toggleCourseCreator.bind(this);
    //common React practice: binding 'this' to functions
  }

  toggleCourseCreator() {
    this.props.toggleCourseCreate(!this.props.ui.courseCreatorDisplayed);
  }
  toggleCourseDisplayed() {
    this.props.toggleCourseDisplay(!this.props.ui.coursesDisplayed);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleCourseCreator}>
          {this.props.ui.courseCreatorDisplayed
            ? "Stop Create Course"
            : "Create Course"}
        </button>
        {this.props.ui.courseCreatorDisplayed ? <CourseCreator /> : null}
        <br />
        <button onClick={this.toggleCourseDisplayed}>
          {this.props.ui.coursesDisplayed
            ? "Stop Displaying Courses"
            : "Display Courses"}
        </button>
        {this.props.ui.coursesDisplayed ? <Courses /> : null}
      </div>
    );
  }
}

export default connect((state) => ({ ui: getUi(state) }), {
  toggleCourseCreate,
  toggleCourseDisplay,
})(App);
//this is react-redux it gives the component props that it can use in this case 2 functions and ui:
