import React, { ReactEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleComplete } from '../../redux/todo/todoSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";



interface Todo {
  id: number,
  text: string,
  completed: boolean
}

const Todo: React.FC<Todo> = () => {
  const [text, setText] = useState<string>("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: ReactEventHandler<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };
  return (
    <div className='min-w-screen min-h-screen flex flex-col space-y-3 justify-center items-center bg-gray-900'>
      <div>
        <input className='bg-white rounded-md p-2' type="text" value={text} placeholder='Please add a todo.' onChange={handleInputChange} />
        <button className='bg-white text-black p-2 font-bold waves-button rounded-md ms-4' onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className='flex flex-col min-w-[300px] bg-orange-100 rounded-md'>
        <ul className='ms-4'>
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              className='bg-blue-300 rounded-md  p-2 flex justify-between m-2'
            >
              <div>
                {todo.text}
              </div>
              <div className='space-x-3'>
                <button onClick={() => handleToggleComplete(todo.id)}>
                  <FaPencilAlt />
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}><FaTrashAlt /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo