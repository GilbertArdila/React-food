
import {  useEffect, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = ({open,children, className='',onClose}) => {

    const dialog = useRef();

    useEffect(()=>{
      const modal = dialog.current;
        if(open){
            //this showModal method is up to native HTML, not React itself
            modal.showModal();
        }
        //clean up function
        return ()=> modal.close();
    },[open])
    
   //the onClose property is to avoid mistakes when user closes it via Esc key
  return createPortal( 
    <dialog className={`modal bg-gray-200 rounded-lg shadow-md p-4 w-80 max-w-xl animation-fade-slide-up ${className}`} ref={dialog} onClose={onClose} >
       {children}
    </dialog>,document.getElementById('modal')
  )
}

export default Modal;