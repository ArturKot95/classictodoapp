import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form"
import { Modal } from 'bootstrap';

export default function NewTodoModal(props) {
  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  let modalRef = useRef();

  function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    Modal.getOrCreateInstance(modalRef.current);
    modalRef.current.addEventListener('hidden.bs.modal', () => {
      reset();
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