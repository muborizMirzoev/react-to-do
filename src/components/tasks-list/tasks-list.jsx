import React from 'react';
import classNames from 'classnames';
import tomorrowRequest from '../../api/tomorrow';

import Button from '../button';
import TaskForm from '../task-form/task-form';
import Task from '../task/task';
import Message from '../message/message';

import Locale from '../../locale';
import './tasks-list.scss';


class TasksList extends React.Component {
  state = { tasks: [], loading: false, message: null };

  componentDidMount() {
    this.setState({ loading: true });
    tomorrowRequest
      .get('/tasks')
      .then(response => {
        const tasks = response.data.data;
        this.setState({ tasks, loading: false });
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  }

  filterActive = () => {
    const activeTasks = this.state.tasks.filter(task => !task.completed);
    this.setState({ tasks: activeTasks });
  };

  toggleCompleted = id => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  };

  addTask = title => {
    this.setState({ loading: true });
    tomorrowRequest
      .post('./tasks', {
        title
      })
      .then(response => {
        if (response.data.status === 'OK') {
          this.setState(prevState => ({
            tasks: [...prevState.tasks, response.data.data]
          }));
        } else {
          this.setState({ message: response.data.message });
        }

        this.setState({ loading: false });
      });
  };

  render() {
    const locale = Locale.tasksList;
    const { loading, message } = this.state;

    return (
      <div
        className={classNames('tasks-list', { 'tasks-list__loading': loading })}
      >
        <TaskForm addTask={this.addTask} />
        {message && <Message message={message} />}
        {this.state.tasks.length === 0 && <div>{locale.emptyMessage}</div>}
        {this.state.tasks.length > 0 &&
          this.state.tasks.map(({ title, completed, id }) => (
            <Task
              title={title}
              completed={completed}
              toggleCompleted={this.toggleCompleted}
              id={id}
              key={id}
            />
          ))}
        <Button label={locale.buttonLabel} onClick={this.filterActive} />
      </div>
    );
  }
}

export default TasksList;