import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { removeGlobalMessageById } from "../features/toastSlice";
import { Toast } from 'bootstrap';

export default function AppToast(props) {
  let toastRef = useRef();
  let toastInstance = useRef();
  let dispatch = useDispatch();

  useEffect(() => {
    toastInstance.current = Toast.getOrCreateInstance(toastRef.current);
    toastInstance.current.show();
  }, []);

  useEffect(() => {
    toastRef.current.addEventListener('hidden.bs.toast', () => {
      dispatch(removeGlobalMessageById(props.id));
    });
  }, [dispatch, props.id]);

  return <div id="appToast" ref={toastRef} className="toast hide text-white bg-primary" role="alert">
    <div className="d-flex">
      <div className="toast-body">
        { props.text }
      </div>
      <button className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
}