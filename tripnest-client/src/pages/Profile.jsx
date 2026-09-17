import "./profile.css"
import { useState, useEffect } from "react";
import api from "../services/api";
import Bookingcard from "../components/Bookingcard"
import Reviewcard from "../components/Reviewcard";
import Profilephoto from "../components/Profilephoto";
export default function Profile({ loginId, isLogin,token,setToken}) {
    const [tourNos, setTourNos] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [moneySpent, setMoneySpent] = useState(0);
    const [onbookings, setOnbookings] = useState(false);
    const [onreviews, setOnreviews] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [user,setUser] = useState([]);
    useEffect(() => {
        async function getVal() {
            try {
                if (isLogin) {
                    const res = await api.get(`/profile/profile-stats/${loginId}`);
                    const res1 = await api.get(`/users/getUser/${loginId}`);
                    console.log(res1);
                    setUser(res1.data.data);
                    setTourNos(res.data.tours);
                    setMoneySpent(res.data.TotalSpent);
                    setReviews(res.data.reviews);
                    setBookings(res.data.bookings);
                    setAllReviews(res.data.allReviews);
                }
            } catch (err) {
                console.log(err.data)
            }
        };
        getVal();
    }, [loginId]);
    const handleProfile = () => {
        setOnbookings(false);
        setOnreviews(false);
    }
    const handleBooking = () => {
        setOnbookings(true);
        setOnreviews(false);
    }
    const handleReviews = () => {
        setOnreviews(true);
        setOnbookings(false);
    }

    return (
        <>
            <div className="profilenavbar"></div>
            <div className="mainprofile">
                <div className="left-side-profile">
                    <div className="myProfile"><span><button onClick={(handleProfile)}>MyProfile</button></span></div>
                    <div className="myBookings"><span><button onClick={(handleBooking)}>MyBookings</button></span></div>
                    <div className="myReviews"><span><button onClick={(handleReviews)}>MyReviews</button></span></div>
                </div>
                <div className="right-side-profile">
                    {!onbookings && !onreviews && (<>
                    <div className="profilepic">
                        <Profilephoto user={user} token={token} setToken={setToken}/>
                    </div>
                        <div className="profileinfo">
                            <div className="totalTourCount">TOURS:<div>{tourNos}</div></div>
                            <div className="totalReviewCount">REVIEWS:<div>{reviews}</div></div>
                            <div className="totalMoneySpent">MONEY SPENT:<div>₹{moneySpent}</div></div>
                        </div>
                    </>)}
                    {onbookings && (
                        <>
                            <div className="profilebookings">
                                {bookings.map((data) => (
                                    <Bookingcard key={data._id} tourName={data.tour.name} tourStatus={data.status} guests={data.guests} tourDate={data.bookingDate} tourPrice={data.price}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {onreviews && (
                        <>
                            <div className="profileReviews">
                                {allReviews.map((data) => (
                                    <Reviewcard key={data._id} reviewWritten={data.review} rating={data.rating} tourName={data.tour.name} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>

    )
}