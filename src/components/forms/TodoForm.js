import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { newTodo, updateTodo } from "../../features/todosSlice";

export default function TodoForm (props) {
  let { _id, ...formValues } = props.todo || {};

  let { register, formState: {errors}, handleSubmit } = useForm({ defaultValues: formValues });
  let dispatch = useDispatch();

  function onSubmit(data) {
    if (!props.mode) {
      throw new Error("Please specify \"mode\" prop when using TodoForm component.");
    } else {
      if (props.mode === 'new') {
        dispatch(newTodo(data));
      } else if (props.mode === 'edit') {
        dispatch(updateTodo({_id: props.todo._id, ...data}));
      }

      if (typeof props.onSubmit === 'function') props.onSubmit(props.mode, data);
    }
  }

  return <form id={props.id} onSubmit={handleSubmit(onSubmit)}>
    <div>
      <div className="my-2">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id={`${props.id}_starred`}
                 {...register('starred')}/>
          <label className="form-check-label" htmlFor={`${props.id}_priority`}>Starred</label>
        </div>
      </div>

      <div className="my-2">
        <label htmlFor={`${props.id}_name`}>Name</label>
        <input id={`${props.id}_name`} type="text" 
                className="form-control" placeholder="e.g. Laundry..."
                {...register('name', {required: true})} />
        {errors.name && <span className="form-text text-danger">Field name is required.</span> }
      </div>

      <div className="my-2">
        <label htmlFor={`${props.id}_description`}>Description</label>
        <textarea className="form-control" id={`${props.id}_description`} placeholder="Description..."
                  {...register('description')}></textarea>
      </div>

      <div className="my-2">
        <label htmlFor={`${props.id}_priority`}>Priority</label>
        <select className="form-select" {...register('priority', {required: true})}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>

      {!props.noSubmitButton && <input className="btn btn-primary my-2" type="submit" value="Save" /> }
    </div>
  </form>
}