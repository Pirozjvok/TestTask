import React from "react";
import cl from './Button.module.css'

const Button = ({className, children, onClick, ...props}) => {
  return (
    <button 
      className={className ? cl.btn + ' ' + className : cl.btn} 
      onClick={onClick} 
      {...props}>
      {children}
    </button>
  );
};

export default Button;
