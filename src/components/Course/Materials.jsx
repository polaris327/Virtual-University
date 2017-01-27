import React, { PropTypes, Component }    from 'react';
import { fetchCourseMaterial }            from '../../redux/actions/mediaActions';
import { connect }                        from 'react-redux';
import MenuItem                           from 'material-ui/MenuItem';
import Divider                            from 'material-ui/Divider';
import { List, ListItem }                 from 'material-ui/List';
import RaisedButton                       from 'material-ui/RaisedButton';
import Avatar                             from 'material-ui/Avatar';
import { FontIcon }                       from 'material-ui';

const propTypes = {
  dispatch: PropTypes.func
};

class Material extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCourseMaterial({
      courseName: this.props.routeParams.name,
      chapterName: this.props.routeParams.chapter,
      fileType: 'PDF'
    }));
  }

  renderFiles() {
    return this.props.courses.materials.map((item) => {
      return (
        <div>
          <List>
            <ListItem
              hoverColor='#ddd'
              leftAvatar={<Avatar icon={<FontIcon className='material-icons' style={{ color: '#fff' }}>picture_as_pdf</FontIcon>} />}
            >
              <a href={item.file.url}>{item.name}</a>
            </ListItem>
          </List>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Course Materials</h1>
        <Divider/>
        {this.renderFiles()}
      </div>
    );
  }
}

Material.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;
  const courses = {
    ...state.courses,
    ...state.quizzes,
    ...state.materials
  };

  return {
    user,
    userAgent,
    menu,
    courses
  };
}

export default connect(mapStateToProps)(Material);
