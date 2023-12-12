import '../styles/ModalWindow.scss';

import React, { useEffect } from 'react';

import { Button } from '../../button';
import ReactModal from 'react-modal';
import closeIcon from '../assets/close.svg';

type ModalWindowProps = {
  text?: string;
  title?: string;
  footer?: React.ReactNode;
  onOk: () => void;
  onCancel: () => void;
  okTitle?: string;
  cancelTitle?: string;
};

const ModalWindow = ({
  isOpen = false,
  text,
  footer,
  title,
  onOk,
  onCancel,
  okTitle = 'Ok',
  cancelTitle = 'Cancel',
  ...props
}: ModalWindowProps & ReactModal.Props) => {
  return (
    <div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        overlayClassName={'modal-overlay'}
        className="modal-window"
        {...props}
      >
        <header>
          {title && <h2>{title}</h2>}
          <img src={closeIcon} alt="close modal" onClick={onCancel} />
        </header>
        <section>
          <p>{text}</p>
        </section>
        <footer>
          <Button text={okTitle} onClick={onOk} />
          <Button text={cancelTitle} onClick={onCancel} />
        </footer>
      </ReactModal>
    </div>
  );
};

export default ModalWindow;
