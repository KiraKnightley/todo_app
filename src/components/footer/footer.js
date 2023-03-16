import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './Footer.css';

export default function Footer(props) {
  const { activeCount, filter, onToggleVisible, onToggleSelect, clearCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter filter={filter} onToggleVisible={onToggleVisible} onToggleSelect={onToggleSelect} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  activeCount: 0,
  onToggleVisible: () => {},
  clearCompleted: () => {},
  onToggleSelect: () => {},
  filter: 'all',
};

Footer.propTypes = {
  activeCount: PropTypes.number,
  onToggleVisible: PropTypes.func,
  clearCompleted: PropTypes.func,
  onToggleSelect: PropTypes.func,
  filter: PropTypes.string,
};
