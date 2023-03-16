import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TaskList.css';
import Task from '../Task';

export default function TaskList(props) {
  const { items, onToggleDone, deleteItem, onPlay, onPause } = props;
  return (
    <ul className="todo-list">
      {items.map(({ id, ...itemProps }) => {
        const labels = classNames({
          completed: itemProps.done,
          editing: itemProps.editable,
        });

        return (
          <li key={id} className={labels}>
            <Task
              {...itemProps}
              onToggleDone={() => onToggleDone(id)}
              deleteItem={() => deleteItem(id)}
              onPlay={() => onPlay(id)}
              onPause={() => onPause(id)}
            />
          </li>
        );
      })}
    </ul>
  );
}

TaskList.defaultProps = {
  items: [],
  onToggleDone: () => {},
  deleteItem: () => {},
};

TaskList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
      editable: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onToggleDone: PropTypes.func,
  deleteItem: PropTypes.func,
};
