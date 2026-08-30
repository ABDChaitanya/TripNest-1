import "./bookingsuccess.css";
import { useParams } from "react-router-dom";
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import api from "./../services/api";
export default function Bookingsuccess() {
    const {id} = useParams();
    let navigate =useNavigate();
    const [tourId,setTourId] = useState(null); 
    const [tprice,setTprice] = useState(null);
    const [bookId,setBookId] = useState(null);
    useEffect(()=>{
        const getBookingdetails =async()=>{
        try{
        const res = await api.get(`/bookings/checkout/${id}`);
        console.log(res);
        setBookId(res.data.booking.id);
        setTprice(res.data.totalPrice);
        setTourId(res.data.booking.tour.id);
        }catch(err){
            console.log(err);
        }
    }
    getBookingdetails();
    },[id]);
    return (
        <div className="bookingsuccess">
            <div className="success-card">
                <div className="success-icon-wrap">
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                </div>
                <div className="booking-details-box">
                    <div className="details-row">
                        <span>Booking ID</span>
                        <strong>#{bookId}</strong>
                    </div>
                    <div className="details-row">
                        <span>Amount Paid</span>
                        <strong>₹{tprice}</strong>
                    </div>
                </div>

                <p className="title">Payment Successful!</p>
                <p className="subtitle">Your booking is confirmed</p>
                <button className="primary-btn">View My Bookings</button>
                <button className="goingbackpayment" onClick={()=>navigate(`/tours`)}>Go Back</button>
            </div>
        </div>

    )
}