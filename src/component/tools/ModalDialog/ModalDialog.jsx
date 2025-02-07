import './ModalDialog.css';

import { useRef, useEffect } from "react";

const keyFramesList = [
  { transform: 'translateY(-100vh)' },
  { transform: 'translateY(0vh)' }
];

const animationSettings = {
  duration: 500,
  iterations: 1,
  fill: "forwards",
  easing: "ease-out",
  direction: "normal",
};

export function ModalDialog({ isOpen, children, className }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();

      dialogRef.current.children[0].children[0].animate(keyFramesList, {...animationSettings, direction: "normal"});
    }

    if (isOpen) {
      return;
    }

    if (dialogRef.current) {
      dialogRef.current.children[0].children[0].animate(keyFramesList, {...animationSettings, direction: "reverse"});
      setTimeout(() => {
        dialogRef.current && dialogRef.current.close();
      }, animationSettings.duration);
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal-box">
      <div className="modal-background">
        <div className={`modal-container ${className}`}>
          {children}
        </div>
      </div>
    </dialog>
  );
}
