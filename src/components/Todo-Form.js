import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ onSubmit }) {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a Todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button type="submit" className="todo-button">
        Add Todo
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;
