import "./checkout.css";
import api from "./../../src/services/api";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./../services/stripe";
import PaymentForm from "./Paymentform";
export default function Checkoutform({ tourname, price, guests, totalPrice, date, bookingId }) {
    const [clientSecret, setClientSecret] = useState(null);
    const handlePayment = async () => {
        try {
            const res = await api.post(`/bookings/${bookingId}/create-payment-intent`);
            setClientSecret(res.data.clientSecret);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="checkoutform-class">
                <div className="checkout-card">
                    <h1 className="checkouttourname">{tourname}</h1>

                    <p className="checkdate">Booking ID: {bookingId}</p>
                    <p className="checkdate">Date Selected: {date}</p>
                    <p className="pricecheck">Tour Price/person: ₹{price}</p>
                    <p className="guestscheck">Tour Guests: {guests}</p>
                    <p className="totalpricecheck">
                        Total amount: <label>₹{totalPrice}</label>
                    </p>

                    {!clientSecret && (
                        <button type="button" onClick={handlePayment}>
                            Pay Now
                        </button>
                    )}

                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm bookingId={bookingId}/>
                        </Elements>
                    )}
                </div>
            </div>
        </>
    )
}