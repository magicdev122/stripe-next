import axios from "axios"

import getStripe from '../../lib/get-stripe';
import Cookies from 'js-cookie';

export default function index() {





    const redirectToCheckout = async () => {
      Cookies.set("mobile","1")
      Cookies.set("email","")
      Cookies.set("pass","")

        // Create Stripe checkout
        const {
          data: { id },
        } = await axios.post('/api/checkout_sessions', {
          items: [{
            price: 'price_1MbblEEPYl4oiRULhEGEhPvg',
            quantity: 1,
          }]
        });
    
        // Redirect to checkout
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId: id });
      };
    
    
    
  return (
    
      <div className="flex justify-center items-center h-screen bg-black flex-column">
        <h3 className="text-white">We are excited to announce the launch of our new mobile app. To Subscribe our app click on button.</h3>
        <button className="px-4 py-2 mt-8 rounded bg-white text-black font-bold" onClick={redirectToCheckout}>
          Subscribe 
        </button>
      </div>
    
  )
}
