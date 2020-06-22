import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import React, { Component } from "react";

class Course extends Component {
  render() {
    const str = this.props.body;
    return (
      <div className="card">
        <h3>{this.props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: str }} />
      </div>
    );
  }
}

export default Course;
