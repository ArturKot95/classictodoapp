import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import AppToastContainer from './components/AppToastContainer';
import NewTodoModal from './components/modals/NewTodo';

export default function App (props) {
  return <>
    <Navbar />
    <div className="row p-3">
      <div className="col-12 col-md-4">
      </div>
      <div className="col-12 col-md-8 mx-auto">
        <TodoList />
      </div>
    </div>
    <AppToastContainer />
    <NewTodoModal id="newTodoModal" />
  </>;
}