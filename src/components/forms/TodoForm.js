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
      <label htmlFor={`${props.id}_name`}>Name</label>
      <input id={`${props.id}_name`} type="text" 
              className="form-control" placeholder="e.g. Laundry..."
              {...register('name', {required: true})} />
      {errors.name && <span className="form-text text-danger">Field name is required.</span> }
      {!props.noSubmitButton && <input className="btn btn-primary my-2" type="submit" value="Save" /> }
    </div>
  </form>
}