import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import { Toast } from 'bootstrap';

export default function AppToast(props) {
  let toastRef = useRef();
  let toastMessage = useSelector(state => state.toast.message);

  useEffect(() => {
    let toastInstance = Toast.getOrCreateInstance(toastRef.current);
    toastInstance.show();
  }, [toastMessage]);

  return <div className="position-fixed bottom-0 text-white start-50 translate-middle-x p-3" style={{zIndex: 11}}>
    <div id="appToast" ref={toastRef} className="toast hide bg-primary" role="alert">
      <div className="d-flex">
        <div className="toast-body">
          { toastMessage }
        </div>
        <button className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  </div>
}