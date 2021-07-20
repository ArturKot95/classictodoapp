import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux"
import { updateTodo } from "../features/todosSlice";
import { addGlobalMessage } from '../features/toastSlice';

export default function TodoListItem(props) {
  let dispatch = useDispatch();
  let initialMount = useRef(true);

  function checkboxHandler(event, _id) {
    dispatch(updateTodo({_id, completed: event.target.checked}));
  }

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    }
    else {
      dispatch(addGlobalMessage(`Todo ${props.todo.name} has been ${props.todo.completed ? '' : 'un'}done.`))
    }
  }, [props.todo.completed, dispatch]);

  return <li className="list-group-item">
    <div className="d-flex">
      <div className="h5 mb-0 me-auto">{ props.todo.name }</div>
      <input type="checkbox" checked={ props.todo.completed }
             className="form-check-input" onChange={(e) => checkboxHandler(e, props.todo._id)} />
    </div>
  </li>
}