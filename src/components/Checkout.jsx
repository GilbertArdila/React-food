import { useContext } from 'react'
import Modal from '../UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from '../UI/Input';
import Button from '../UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries()); //{email:email@gmail.com, name:miName...}  

        sendRequest(JSON.stringify({
            order: {
                item: cartCtx.items,
                customer: customerData
            }
        }))

    }
    if(data && !error){
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p>We have sent you an email with more information about your order, please verify your email account. </p>
                <p className='flex justify-end gap-4'>
                <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount:{currencyFormatter.format(cartTotal)} </p>
                <Input label='Full name' type='text' id='name' />
                <Input label='E-Mail Address' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className='flex justify-start gap-4'>
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>

                {error && <Error title='Failed to submit order' message={error}/> }

                <p className='flex justify-end gap-4'>
                    {isLoading ? <span>Sending order...</span> :
                        <>
                            <Button textOnly type='button' onClick={handleClose}>Close</Button>
                            <Button>Submit Order</Button>
                        </>
                    }


                </p>
            </form>
        </Modal>
    )
}

export default Checkout;