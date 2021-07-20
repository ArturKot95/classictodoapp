import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import AppToast from './components/AppToast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { displayMessage } from './features/toastSlice';

export default function App (props) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayMessage('Zadanie "Umów się do fryzjera" zostało usunięte.'));
  }, [dispatch]);

  return <>
    <Navbar />
    <div className="row">
      <div className="col-12 col-md-8 col-lg-6 mx-auto pt-5">
        <TodoList />
      </div>
    </div>
    <AppToast />
  </>;
}