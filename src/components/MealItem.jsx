/* eslint-disable react/prop-types */
import { useContext } from "react";

import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";


const MealItem = ({ meal }) => {
 const cartCtx = useContext(CartContext);

 function handleAddMealToCart() {
     cartCtx.addItem(meal);
 }

    return (
        <li className='bg-gray-900 rounded-lg overflow-hidden text-center shadow-md'>
            <article className='flex flex-col justify-between h-full '>
                <img className='w-full h-80 object-cover' src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3 className='text-lg font-bold my-3 mx-0'>{meal.name}</h3>
                    <p className='m-4'>{currencyFormatter.format(meal.price)}</p>
                    <p className='inline-block bg-gray-900 text-yellow-400 font-bold text-sm px-8 py-2 m-0 rounded-md'>{meal.description}</p>
                </div>

                <p className='mb-6'>
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}

export default MealItem;