export default function TodoListItem(props) {
  return <li className="list-group-item">
    { props.todo.name }
  </li>
}