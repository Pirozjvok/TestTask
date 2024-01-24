import React from 'react';
import cl from './Alert.module.css'

const Alert = ({children, onClose, className}) => {
  let alertClass = cl.alert 
  if (className) {
    alertClass += ' ' + className
  }
  return ( 
    <div className={alertClass}>
      <div style={{display: 'contents'}}>
        {children}
      </div>
      <div className={cl.close} tabIndex={0} onClick={onClose}>
        x
      </div>
    </div>
  );
}
 
export default Alert;
