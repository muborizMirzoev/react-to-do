import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { ReactComponent as DeleteIcon } from './delete.svg';
import './task.scss';

const Task = (props) => {
  return (
    <div className='task'>
      <div
        className={className('tast_title', {
          task_title__completed: props.completed
        })}
        onClick={props.toggleCompleted}
      >
        {props.title}
      </div>
      <DeleteIcon className='task_delete-icon'/>
    </div>
  )
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleCompleted: PropTypes.func.isRequired
}

export default Task;