import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from '../features/todosSlice';
import TodoListItem from './TodoListItem';

export default function TodoList(props) {
  let dispatch = useDispatch();
  let todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  let completedTodos = todos.filter(todo => todo.completed === true).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));
  let uncompletedTodos = todos.filter(todo => todo.completed === false).map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ));

  return <ul className="list-group">
    {todos.length > 0
     ? <>
      {uncompletedTodos}
      {completedTodos.length > 0 && 
      <>
        <hr/>
        <h4>Completed</h4>
        {completedTodos}
      </>}
     </>
     : <a role="button" className="primary-link" data-bs-toggle="modal" data-bs-target="#newTodoModal">Create one.</a>

    }
  </ul>
}