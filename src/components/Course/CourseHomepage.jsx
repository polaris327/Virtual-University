import React, { PropTypes, Component }    from 'react';
import { fetchCourseOverview }            from '../../redux/actions/coursesActions';
import { connect }                        from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func,
};

class CourseHomepage extends Component {
  componentWillMount() {
    console.log(this.props);
    this.props.dispatch(fetchCourseOverview(this.props.routeParams.name));
  }

  renderOverviewText() {
    return {
      __html: this.props.courses.overviewContent,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div dangerouslySetInnerHTML={this.renderOverviewText()}>
        </div>
      </div>
    );
  }
}

CourseHomepage.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;
  const courses = state.courses;

  return {
    user,
    userAgent,
    menu,
    courses
  };
}

export default connect(mapStateToProps)(CourseHomepage);
