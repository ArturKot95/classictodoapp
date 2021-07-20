import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form"
import { Modal } from 'bootstrap';
import { newTodo } from "../../features/todosSlice";
import { useDispatch } from "react-redux";
import { addGlobalMessage } from "../../features/toastSlice";
import $ from 'jquery'

export default function NewTodoModal(props) {
  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  let dispatch = useDispatch();
  let modalRef = useRef();

  function onSubmit(data) {
    dispatch(() => {
      dispatch(newTodo(data));
      dispatch(addGlobalMessage(`Todo ${data.name} created.`));
      Modal.getOrCreateInstance(modalRef.current).hide();
    });
  }

  useEffect(() => {
    Modal.getOrCreateInstance(modalRef.current);
    modalRef.current.addEventListener('hidden.bs.modal', function() {
      reset();
     
      $('body').css('overflow', 'auto');
      $('.modal-backdrop').remove();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor={`${props.id}_name`}>Name</label>
              <input id={`${props.id}_name`} type="text" 
                      className="form-control" placeholder="e.g. Laundry..."
                      {...register('name', {required: true})} />
              {errors.name && <span className="form-text text-danger">Field name is required.</span> }
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Save</button>
        </div>
      </div>
    </div>
  </div> 
}