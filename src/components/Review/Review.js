import React from 'react';
import { useEffect , useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();


    const handleProceedCheckOut = () => {
         history.push('/shipment');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        //console.log('Order placed');
    }

    const removeProduct = (productKey) => {
        //console.log('remove clicked');
        const newcart = cart.filter(pd => pd.key !== productKey);
        setCart(newcart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        //console.log(cartProducts);
        setCart(cartProducts);
    },[]);

   let thankYou ;
   if(orderPlaced){
       thankYou =<img src={happyImage} alt=""/>
   }

    return (
        <div className="shop-container">
            
             <div className="product-container">
                {    
                  cart.map(product =>  <ReviewItem 
                    key={product.key}
                    removeProduct = {removeProduct}
                    product={product}></ReviewItem>)
                }
                {thankYou}
                
             </div>
             <div className="cart-container">
                  <Cart cart={cart}>
                      <button onClick={handleProceedCheckOut} className="cart-button">Proceed Checkout</button>
                  </Cart>
             </div>
        </div>
    );
};

export default Review;