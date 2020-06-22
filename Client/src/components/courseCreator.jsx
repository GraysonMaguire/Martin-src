import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { addCourse, fetchCourses } from "../actions/courseActions";

import { connect } from "react-redux";

class CourseCreator extends Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCourseSubmit = this.handleCourseSubmit.bind(this);
    this.state = {
      title: "",
      body: "",
    };
  }

  handleTitleChange = (content) => {
    this.setState({ [content.target.name]: content.target.value });
  };
  handleBodyChange = (content, editor) => {
    this.setState({ body: content });
  };
  handleCourseSubmit(event) {
    event.preventDefault();

    const course = {
      title: this.state.title,
      body: this.state.body,
    };

    this.props.addCourse(course);
    this.props.fetchCourses();
    this.setState({ title: "", body: "" });
    //close course editor
  }
  render() {
    return (
      <div>
        <h3>Add Post</h3>
        <form onSubmit={this.handleCourseSubmit}>
          <div>
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          </div>
          <label>Body:</label>
          <Editor
            apiKey="joo4anrt9y6f509vb6hgyxiun1mn3if5hoafvdwd1pfd43zb"
            initialValue=""
            init={{
              height: 500,
              inline: false,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={this.handleBodyChange}
            value={this.state.body}
          />
          <button style={{ float: "right" }}>Submit course</button>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  addCourse,
  fetchCourses,
})(CourseCreator);
