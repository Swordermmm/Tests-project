interface ModalProps {
  name?: string;
  closeButtontext: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export default function Modal(props: ModalProps): ReturnType<React.FC> {
  return (
    <div
      className={`${"modal"} ${
        props.isOpen ? "display-block" : "display-none"
      }`}
    >
      <div className="modal-main">
        <div className="modal-head">
          <h1>{props.name}</h1>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={props.onClose}>
            {props.closeButtontext}
          </button>
        </div>
      </div>
    </div>
  );
}
