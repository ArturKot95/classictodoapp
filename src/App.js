import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from './features/todosSlice';
import TodoList from './components/TodoList';

import Navbar from './components/Navbar';

export default function App (props) {
  return <>
    <Navbar />
    <div className="row">
      <div className="col-12 col-md-8 col-lg-6 mx-auto pt-5">
        <TodoList />
      </div>
    </div>
  </>;
}