/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const CartContext = createContext({
    items:[],
    addItem: (item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{},
});

function cartReducer(state,action) {
    if(action.type === 'ADD_ITEM'){
        //check if the item already exist on the array
        const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id);
        //create a new array copy
        const updatedItems=[...state.items]
        //if exists
        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];

            //add one to the current quantity
            const updatedItem={
                ...existingItem,
                quantity:existingItem.quantity + 1
            }
            //rewrite the item
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            //the quantity starts in 1
            updatedItems.push({...action.item, quantity:1});
        }
        //return the new items array
        return {...state, items:updatedItems}
    }
    if(action.type === 'REMOVE_ITEM'){
         //check if the item already exist on the array
         const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id);
         //create a new array copy
         const updatedItems=[...state.items]
         //if exists
         if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            //if quantity is bigger than 1, remove 1 to them
            if(existingItem.quantity > 1){
            const updatedItem={
                ...existingItem,
                quantity:existingItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
            }else if(existingItem.quantity === 1){
                
                updatedItems.splice(existingCartItemIndex, 1);
            }
        }else{
            console.warn('This item does not exist on the array');
        }
         //return the new items array
         return {...state, items:updatedItems}
    }
    if(action.type === 'CLEAR_CART'){
        return {...state, items:[]}
    }

    return state;
    
}

export function CartContextProvider({children}){
   const [cart, dispatchCartAction]=useReducer(cartReducer,{items:[]});

  
   function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM', item});
   }
   function removeItem(id) {
    dispatchCartAction({type: 'REMOVE_ITEM', id});
   }
   function clearCart() {
    dispatchCartAction({type: 'CLEAR_CART'})
   }

   const cartContext ={
    items : cart.items,
    addItem,
    removeItem,
    clearCart
   };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;