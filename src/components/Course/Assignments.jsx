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

class Assignment extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCourseQuiz({
      courseName: this.props.routeParams.name,
      chapterName: this.props.routeParams.chapter,
      isAssignment: true
    }));
  }

  renderQuestions() {
    const component = this;

    if (this.props.courses && this.props.courses.assignments) {
      return component.props.courses.assignments.map((item) => {
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
        {this.renderSendButton()}
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
        {this.renderSendButton()}
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
        {this.renderSendButton()}
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
        {this.renderSendButton()}
      </div>
    );
  }

  renderSendButton(sendInfo) {
    return (
      <div style={{ textAlign:'right' }}>
        <RaisedButton
          primary={true}
          label='Send'
        />
      </div>
      
    );
  }

  renderDivider() {
    return <Divider style={{ marginTop: '50px', marginBottom: '50px' }} />;
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <h1>{'Assignments'}</h1>
        {this.renderDivider()}
        {this.renderQuestions()}
      </div>
    );
  }
}

Assignment.propTypes = propTypes;

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

export default connect(mapStateToProps)(Assignment);
