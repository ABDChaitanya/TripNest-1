import {PaymentElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
export default function PaymentForm({bookingId}){
    const stripe = useStripe();
    const elements = useElements();
      let navigate = useNavigate();
     const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const {error,paymentIntent} = await stripe.confirmPayment({
            elements,
            // confirmParams: {
            //     return_url: window.location.origin + "/payment-success"
            // }
            redirect:"if_required"
        });
        
        if(error){
            console.log(error);
        }else if(paymentIntent){
            console.log(paymentIntent);
            navigate(`/bookings/booking-success/${bookingId}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <PaymentElement />

            <button
                type="submit"
                disabled={!stripe}
            >
                Pay Now
            </button>

        </form>
    );
}