import {loadStripe} from '@stripe/stripe-js'
let stripePromise=null

const getStripe=()=>{


    if(!stripePromise){
        stripePromise=loadStripe("pk_test_51MbOhQEPYl4oiRULdcJk5Bls5FYrlEDKFqhgEd9p7bhUneFzanaj136TOSmdSSxwbO7FTtaxN3slpN2w8nb4hWv4006q8E6a90")
    }
    return stripePromise
}
export default getStripe  