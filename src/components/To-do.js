import React, { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TiEdit } from 'react-icons/ti';
import PropTypes from 'prop-types';
import TodoForm from './Todo-Form';

function Todo({
  todos, completeTodo, removeTodo, updateTodo,
}) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div
          className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
          key={todo.id}
          role="button"
          tabIndex={0}
          onClick={() => completeTodo(todo.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              completeTodo(todo.id);
            }
          }}
        >
          {todo.text}
          <div className="icons">
            <CgCloseR
              onClick={() => removeTodo(todo.id)}
              className="todo-icon"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  removeTodo(todo.id);
                }
              }}
            />
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit-icon"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEdit({ id: todo.id, value: todo.text });
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

Todo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  completeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default Todo;
