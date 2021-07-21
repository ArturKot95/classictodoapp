import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from '../features/todosSlice';
import TodoListItem from './TodoListItem';

export default function TodoList(props) {
  let dispatch = useDispatch();
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
  }, [dispatch]);

  let completedTodos = filteredTodos.filter(todo => todo.completed === true).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));
  let uncompletedTodos = filteredTodos.filter(todo => todo.completed === false).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));

  return <>
    <input type="text" className="form-control my-2" placeholder="Filter..." 
            onChange={(e) => setFilterText(e.target.value)} />
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
      : <a role="button" className="primary-link" data-bs-toggle="modal" data-bs-target="#newTodoModal">Create one.</a>

      }
    </ul>
  </>
}