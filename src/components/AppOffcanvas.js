import { Offcanvas } from "bootstrap";
import { useEffect, useRef } from "react";

export default function AppOffcanvas(props) {
  let offcanvasRef = useRef(null);

  useEffect(() => {
    Offcanvas.getOrCreateInstance(offcanvasRef.current);
  }, []);

  return <div id={props.id} ref={offcanvasRef} className="offcanvas offcanvas-start">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title">{props.title}</h5>
      <div className="offcanvas-body">
        {props.children}
      </div>
    </div>
  </div>
}