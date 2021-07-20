import { useSelector } from "react-redux";
import AppToast from './AppToast';

export default function AppToastContainer(props) {
  let globalMessages = useSelector(state => state.globalMessages);
  let appToasts = globalMessages.map(message => (
    <AppToast key={message.id} {...message} />
  ));

  return <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
    { appToasts }
  </div>
}