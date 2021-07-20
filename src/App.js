import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from './features/todosSlice';

export default function App (props) {
  let dispatch = useDispatch();
  let todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  let todosElements = todos.map(todo => (
    <li>{todo.name}</li>
  ));

  return <ul> {todosElements} </ul>
}