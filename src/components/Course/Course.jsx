import React, { PropTypes, Component }    from 'react';

const propTypes = {
  name: PropTypes.string
};

const defaultProps = {
  name: ''
};

class Course extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          <p>Course content will coming here....</p>
        </div>
      </div>
    );
  }
}

Course.propTypes = propTypes;
Course.defaultProps = defaultProps;

export default Course;
