import React, { useEffect, useRef } from 'react';
import cl from './Modal.module.css'

const Modal = ({children, onClose}) => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.focus()
  }, [])

  const onClick = (e) => {
    e.stopPropagation()
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }
  
  return ( 
    <div className={cl.modal} ref={modalRef} onClick={onClick} tabIndex={-1} onKeyDown={onKeyDown}>
      <div className={cl.content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
 
export default Modal;
