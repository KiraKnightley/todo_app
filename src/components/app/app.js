import React, { useState, useEffect } from 'react';
import './App.css';

import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [maxId, setMaxId] = useState('1');

  const createTodoItem = (description, timeInSec) => ({
    description,
    timeInSec,
    isTimerOn: false,
    created: Date.now(),
    done: false,
    editable: false,
    id: `${maxId}`,
  });

  const toggleProperty = (arr, id, propName, value = !arr[arr.findIndex((item) => item.id === id)][propName]) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: value };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    const itemsToggle = toggleProperty(items, id, 'done');
    setItems(itemsToggle);
  };

  const getTime = (minutes, seconds) => +minutes * 60 + +seconds;

  const addItem = (description, minutes, seconds) => {
    const timeInSec = getTime(minutes, seconds);
    const newItem = createTodoItem(description, timeInSec);
    const newArr = [...items, newItem];
    setItems(newArr);
    setMaxId((id) => `${+id + 1}`);
  };

  const deleteItem = (id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newArr = [...items.slice(0, idx), ...items.slice(idx + 1)];
    setItems(newArr);
  };

  const onToggleVisible = (selector) => {
    setFilter(selector);
  };

  const onToggleSelect = (btn) => {
    setFilter(btn);
    onToggleVisible(btn);
  };

  const showList = (visibility) => {
    switch (visibility) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      default:
        return items.filter((item) => item.done);
    }
  };

  const clearCompleted = () => {
    const newArr = items.filter((item) => !item.done);
    setItems(newArr);
  };

  const onPlay = (id) => {
    setItems(toggleProperty(items, id, 'isTimerOn', true));
  };

  const onPause = (id) => {
    setItems(toggleProperty(items, id, 'isTimerOn', false));
  };

  const updateTime = () => {
    const newArr = items.map((item) => {
      if (item.timeInSec === 0 || item.done) {
        return item;
      }
      if (item.isTimerOn) {
        // eslint-disable-next-line no-param-reassign
        item.timeInSec -= 1;
      }
      return item;
    });
    setItems(newArr);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [items]);

  const doneCount = items.filter((item) => item.done).length;
  const activeCount = items.length - doneCount;
  const visibleList = showList(filter);

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          items={visibleList}
          onToggleDone={onToggleDone}
          deleteItem={deleteItem}
          onPlay={onPlay}
          onPause={onPause}
        />
        <Footer
          activeCount={activeCount}
          filter={filter}
          onToggleVisible={onToggleVisible}
          onToggleSelect={onToggleSelect}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}
