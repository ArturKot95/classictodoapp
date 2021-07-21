import { useDispatch } from "react-redux"
import { updateTodo } from "../features/todosSlice";
import { addGlobalMessage } from '../features/toastSlice';

export default function TodoListItem(props) {
  let dispatch = useDispatch();

  function checkboxHandler(event, _id) {
    dispatch(() => {
      dispatch(updateTodo({_id, completed: event.target.checked}));
      dispatch(addGlobalMessage(`Todo ${props.todo.name} has been ${props.todo.completed ? '' : 'un'}done.`))
    });

    event.stopPropagation();
  }

  return <li className="list-group-item" role="button">
    <div className="d-flex">
      <div className="h5 mb-0 me-auto">{ props.todo.name }</div>
      <input type="checkbox" role="button" checked={ props.todo.completed }
             className="form-check-input" 
             onClick={(e) => e.stopPropagation()} 
             onChange={(e) => checkboxHandler(e, props.todo._id)} />
    </div>
  </li>
}