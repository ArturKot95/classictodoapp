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
    <TodoListItem todo={todo} />
  ))

  return <ul className="list-group">
    { todosItems }
  </ul>
}