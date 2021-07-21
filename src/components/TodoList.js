import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from '../features/todosSlice';
import TodoListItem from './TodoListItem';
import { Dropdown } from "bootstrap";
import $ from 'jquery';

export default function TodoList(props) {
  let dispatch = useDispatch();
  let sortDropdown = useRef();
  let [filterText, setFilterText] = useState('');
  let todos = useSelector(state => state.todos);
  let filteredTodos = function() {
    if (filterText.trim().length >= 3) {
      return todos.filter(todo => todo.name.toLowerCase().includes(filterText.trim().toLowerCase()));
    } else {
      return todos;
    }
  }();


  useEffect(() => {
    dispatch(fetchTodos());
    $(sortDropdown.current).on('click', () => $('.dropdown-menu', this).toggleClass('show'));
  }, [dispatch]);

  let completedTodos = filteredTodos.filter(todo => todo.completed === true).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));
  let uncompletedTodos = filteredTodos.filter(todo => todo.completed === false).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));

  return <>
    <div className="d-flex my-2">
      <input type="text" className="form-control" placeholder="Filter..." 
            onChange={(e) => setFilterText(e.target.value)} />

      <div ref={sortDropdown} className="dropdown ms-2">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Sort
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
    <ul className="list-group">
      {todos.length > 0
      ? <>
        {uncompletedTodos}
        {completedTodos.length > 0 && 
        <>
          <h4 className="my-2">Completed</h4>
          {completedTodos}
        </>}
      </>
      : <>
      <span className="h5">No todos...</span>
      <a role="button" className="primary-link" data-bs-toggle="modal" data-bs-target="#newTodoModal">Create one.</a>
      </>

      }
    </ul>
  </>
}