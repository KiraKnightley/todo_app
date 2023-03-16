import React, { useState } from 'react';
import './NewTaskForm.css';

export default function NewTaskForm(props) {
  const { addItem } = props;

  const defaultData = {
    description: '',
    minutes: '',
    seconds: '',
  };
  const [data, setData] = useState(defaultData);

  const onLabelChange = (e) => {
    if (e.target.name === 'seconds' && e.target.value >= 60) {
      e.target.value = '';
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { description, minutes, seconds } = data;

    if (description.trim().length && minutes.trim().length && seconds.trim().length) {
      addItem(description, minutes, seconds);
      setData(defaultData);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <button type="submit" aria-label="submission" />
        <input
          type="text"
          className="new-todo"
          name="description"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          minLength={1}
          maxLength={20}
          value={data.description}
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="minutes"
          value={data.minutes}
          placeholder="Min"
          onChange={onLabelChange}
          pattern="[0-9]*"
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="seconds"
          value={data.seconds}
          placeholder="Sec"
          onChange={onLabelChange}
          pattern="[0-6]{1}[0-9]*"
          required
        />
      </form>
    </header>
  );
}

NewTaskForm.defaulProps = {
  addItem: () => {},
};
