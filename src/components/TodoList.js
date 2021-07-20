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

  let todosItems = todos.map(todo => (
    <TodoListItem key={todo._id} todo={todo} />
  ))

  return <ul className="list-group">
    {todosItems.length > 0 
      ? todosItems 
      : <>
        <span className="display-2"> No todos yet. </span>
        <a role="button" class="primary-link" data-bs-toggle="modal" data-bs-target="#newTodoModal">Create one.</a>
      </>
    }
  </ul>
}