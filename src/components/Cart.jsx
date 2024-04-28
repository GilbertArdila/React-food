
import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import {currencyFormatter} from '../util/formatting';
import Button from '../UI/Button';
import CartItem from '../UI/CartItem';


const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>totalPrice + item.quantity * item.price,0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleOpenCheckout() {
        userProgressCtx.showCheckout();
    }

  return (
    <Modal className='cart' open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ?handleCloseCart: null}>
        <h2 className='m-4 font-bold'>Your Cart</h2>
        <ul  className='list-none my-2 mx-auto p-0'>
            {cartCtx.items.map((item)=>(
               <CartItem key={item.id} item={item}/>
            ))}
        </ul>
        <p className='flex justify-end my-8 mx-auto text-lg font-bold text-gray-800'>{currencyFormatter.format(cartTotal)}</p>
        <p className="flex justify-end gap-4">
            <Button textOnly className='text-gray-900 hover:text-gray-800 active:text-gray-800' onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button className='font-bold' onClick={handleOpenCheckout}>Go to checkout</Button>}
            
        </p>
    </Modal>
  )
}

export default Cart;