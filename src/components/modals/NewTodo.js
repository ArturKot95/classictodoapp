import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form"
import { Modal } from 'bootstrap';
import { newTodo } from "../../features/todosSlice";
import { useDispatch } from "react-redux";
import { addGlobalMessage } from "../../features/toastSlice";
import TodoForm from "../forms/TodoForm";
import $ from 'jquery'

export default function NewTodoModal(props) {
  let { handleSubmit, reset} = useForm();
  let dispatch = useDispatch();
  let modalRef = useRef();

  function onSubmit(data) {
    dispatch(() => {
      // dispatch(newTodo(data));
      dispatch(addGlobalMessage(`Todo "${data.name}" created.`));
      Modal.getOrCreateInstance(modalRef.current).hide();
    });
  }

  useEffect(() => {
    Modal.getOrCreateInstance(modalRef.current);
    modalRef.current.addEventListener('hidden.bs.modal', function() {
      reset();
      window.backdropFix();
    });
    
    modalRef.current.addEventListener('shown.bs.modal', function() {
      $('input', this).get(0).focus();
    });
  }, [reset]);

  return <div className="modal" ref={modalRef} id={props.id}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">New Todo</div>
        <div className="modal-body">
          <TodoForm id="newTodoModalForm" noSubmitButton mode="new" onSubmit={(mode, data) => onSubmit(data)} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button form="newTodoModalForm" className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div> 
}