import { Offcanvas } from "bootstrap";
import { useEffect, useRef } from "react";
import $ from 'jquery';

export default function AppOffcanvas(props) {
  let offcanvasRef = useRef(null);
  let offcanvasInstance = useRef(null);

  useEffect(() => {
    offcanvasInstance.current = Offcanvas.getOrCreateInstance(offcanvasRef.current);
    offcanvasInstance.current.show();
    $('input', offcanvasRef.current)[0].focus();

    offcanvasRef.current.addEventListener('hidden.bs.offcanvas', props.onHide);

    return () => window.backdropFix();
  }, [props]);

  return <div id={props.id} ref={offcanvasRef} className="offcanvas offcanvas-start">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title">{props.title}</h5>
      <button className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div className="offcanvas-body">
      { props.children }
    </div>
  </div>
}