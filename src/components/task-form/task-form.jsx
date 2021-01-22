import React from 'react';

import Button from '../button';
import './task-form.scss';
import Locale from '../../locale';
import PropTypes from 'prop-types';

class TaskForm extends React.Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired
  };
  
  state = { title: ''};

  handleInput = event => {
    this.setState({ title: event.target.value });
  };

  addTask = () => {
    const { addTask } = this.props;
    const { title } = this.state;

    addTask(title);
  }

  render() {
    const { title } = this.state;
    const locale = Locale.taskForm;
    return (
      <div className='task-form'>
        <input type='text' value={title} onChange={this.handleInput}/>
        <Button onClick={this.addTask} label={locale.addButtonLabel}></Button>
      </div>
    );
  }
}

export default TaskForm;