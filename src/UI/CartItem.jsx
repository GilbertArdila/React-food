/* eslint-disable react/prop-types */
import { useContext } from "react";

import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

const CartItem = ({item}) => {
    const {name, quantity, price} = item;
    const cartCtx = useContext(CartContext);

    function handleIncreaseAmount() {
        cartCtx.addItem(item);
    }
    function handleDecreaseAmount() {
        cartCtx.removeItem(item.id);
    }
  return (
    <li className="flex justify-between items-center my-2 mx-auto">
        <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
        <p className="flex gap-4 items-center">
            <button 
            className="flex justify-center items-center cursor-pointer text-base w-6 h-6 rounded-full border-none bg-gray-800 text-yellow-400 hover:gb-gray 900 active:text-yellow-400"
            onClick={handleDecreaseAmount}
            >-</button>
            <span>{quantity}</span>
            <button 
            className="flex justify-center items-center cursor-pointer text-base w-6 h-6 rounded-full border-none bg-gray-800 text-yellow-400 hover:gb-gray 900 active:text-yellow-400"
            onClick={handleIncreaseAmount}
            >+</button>
        </p>
    </li>
  )
}

export default CartItem;