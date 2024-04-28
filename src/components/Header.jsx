import { useContext } from 'react';

import logo from '../assets/logo.jpg';
import Button from '../UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce ((totalNumberOfItems,item)=>{
    return totalNumberOfItems + item.quantity
  },0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header className='flex justify-between items-center px-5 md:px-20 py-12'>
        <div className='flex space-x-2 md:space-x-5'>
            <img className='w-8 h-8 md:w-16 md:h-16 object-contain rounded-full border-2 border-solid border-yellow-400' src={logo} alt="hamburger" />
            <h1 className='flex md:gap-4 items-center text-sm md:text-2xl '>REACTFOOD</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart} >Cart ({totalCartItems})</Button>
          
        </nav>
        
    </header >
  )
}

export default Header;

  
  
  
  
 