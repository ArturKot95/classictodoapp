import { useDispatch } from "react-redux"
import { updateTodo } from "../features/todosSlice";

export default function TodoListItem(props) {
  let dispatch = useDispatch();

  function checkboxHandler(event) {
    dispatch(updateTodo({...props.todo, completed: event.target.checked}));
  }

  return <li className="list-group-item">
    <div className="d-flex">
      <div className="h5 mb-0 me-auto">{ props.todo.name }</div>
      <input type="checkbox" checked={ props.todo.completed }
             className="form-check-input" onChange={checkboxHandler} />
    </div>
  </li>
}