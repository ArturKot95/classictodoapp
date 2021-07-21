import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { updateTodo, removeTodo } from "../features/todosSlice";
import { addGlobalMessage } from '../features/toastSlice';
import AppOffcanvas from "./AppOffcanvas";
import TodoForm from "./forms/TodoForm";
import { Tooltip } from "bootstrap";
import $ from 'jquery';

export default function TodoListItem(props) {
  let dispatch = useDispatch();
  let [editMode, setEditMode] = useState(false);
  let starIcons = useRef(null);

  useEffect(() => {
    $('i', starIcons.current).each(function () { new Tooltip(this) });
  }, []);

  function checkboxHandler(event) {
    dispatch(() => {
      dispatch(updateTodo({_id: props.todo._id, completed: event.target.checked}));
      dispatch(addGlobalMessage(`Todo "${props.todo.name}" has been ${props.todo.completed ? '' : 'un'}done.`))
    });

    event.stopPropagation();
  }

  function todoFormSubmitHandler (mode, data) {
    if (mode === 'edit') {
      dispatch(addGlobalMessage(`Todo updated.`))
      setEditMode(false);
    }
  }

  function deleteTodoHandler() {
    dispatch(() => {
      dispatch(removeTodo(props.todo._id));
      dispatch(addGlobalMessage(`Todo "${props.todo.name}" removed.`));
    });
    setEditMode(false);
  }

  function toggleStarHandler(event) {
    dispatch(updateTodo({_id: props.todo._id, starred: !props.todo.starred}));
    event.stopPropagation();
  }

  return <>
    {editMode && 
      <AppOffcanvas title={`Edit ${props.todo.name}`} onHide={() => setEditMode(false)}>
        <TodoForm mode="edit" todo={props.todo} onSubmit={(mode, data) => todoFormSubmitHandler(mode, data)}/>
        <div className="position-absolute bottom-0 end-0 pb-3 pe-3">
          <button className="btn btn-danger" onClick={deleteTodoHandler}>Remove</button>
        </div>
      </AppOffcanvas>
    }
    <li className={`list-group-item ${editMode && 'active'}`} role="button" onClick={() => setEditMode(true)}>
      <div className="d-flex">
        <div className="me-2" ref={starIcons} onClick={(e) => toggleStarHandler(e)}>
          { props.todo.starred 
            ? <i className="bi-star-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove star"></i>
            : <i className="bi-star" data-bs-toggle="tooltip" data-bs-placement="top" title="Star todo"></i>
          }
        </div>
        <div className="h5 mb-0 me-auto">
          { props.todo.name }
          { props.todo.description && <i className="bi-sticky ms-2"></i> }
        </div>

        <input type="checkbox" role="button" checked={ props.todo.completed }
              className="form-check-input" 
              onClick={(e) => e.stopPropagation()} 
              onChange={(e) => checkboxHandler(e)} />
      </div>
    </li>
  </>
}