import React, { PropTypes, Component }    from 'react';
import { fetchCourseQuiz }                from '../../redux/actions/quizActions';
import { connect }                        from 'react-redux';
import TextField                          from 'material-ui/TextField';
import SelectField                        from 'material-ui/SelectField';
import MenuItem                           from 'material-ui/MenuItem';
import Divider                            from 'material-ui/Divider';
import Checkbox                           from 'material-ui/Checkbox';
import { List, ListItem }                 from 'material-ui/List';
import CodeMirror                         from 'react-codemirror';
import CodeMirrorCSS                      from '../../../node_modules/codemirror/lib/codemirror.css';
import RaisedButton                       from 'material-ui/RaisedButton';

const propTypes = {
  dispatch: PropTypes.func
};

class Quiz extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCourseQuiz({
      courseName: this.props.routeParams.name,
      chapterName: this.props.routeParams.chapter,
      isAssignment: false
    }));
  }

  renderQuestions() {
    const component = this;

    if (this.props.courses && this.props.courses.quizzes) {
      return component.props.courses.quizzes.map((item) => {
        switch (item.questionType) {
          case 'short answer':
            return component.renderShortAnswer(item);

          case 'multiple select':
            return component.renderMultipleSelect(item);

          case 'multiple choice':
            return component.renderMultipleChoice(item);

          case 'coding':
            return component.renderCodeQuestion(item);

          default:
            return <div>{'ERROR: question format error'}</div>;
        }
      });
    }
  }

  renderShortAnswer(item) {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          <TextField hintText='Type your answer here' />
        </div>
        {this.renderDivider()}
      </div>
    );
  }

  renderMultipleSelect(item) {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          <SelectField
            floatingLabelText='Answer'
          >
            {item.questionOptionsSelect.map((selectOption) => {
              return (
                <MenuItem
                  value={selectOption}
                  primaryText={selectOption}
                />
              )}
            )}
          </SelectField>
        </div>
        {this.renderDivider()}
      </div>
    );
  }

  renderMultipleChoice(item) {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          <List>
            {item.questionOptionsChoice.map((choiceOption) => {
              return (
                <ListItem
                  leftCheckbox={<Checkbox />}
                  primaryText={choiceOption}
                />
              );
            })}
          </List>
        </div>
        {this.renderDivider()}
      </div>
    );
  }

  renderCodeQuestion(item) {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <CodeMirror options={{ lineNumbers: true, }}/>
        {this.renderDivider()}
      </div>
    );
  }

  renderDivider() {
    return <Divider style={{ marginTop: '50px', marginBottom: '50px' }} />;
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <h1>{'Quiz'}</h1>
        {this.renderDivider()}
        {this.renderQuestions()}
        <RaisedButton primary={true} label='Send' style={{ marginBottom: '100px' }}/>
      </div>
    );
  }
}

Quiz.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;
  const courses = {
    ...state.courses,
    ...state.quizzes
  };

  return {
    user,
    userAgent,
    menu,
    courses
  };
}

export default connect(mapStateToProps)(Quiz);
