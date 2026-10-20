import "./profile.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import Bookingcard from "../components/Bookingcard";
import Reviewcard from "../components/Reviewcard";
import Profilephoto from "../components/Profilephoto";

export default function Profile({ loginId, isLogin, token, setToken }) {
    const [tourNos, setTourNos] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [moneySpent, setMoneySpent] = useState(0);
    const [onbookings, setOnbookings] = useState(false);
    const [onreviews, setOnreviews] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isCurrent = true;
        async function getVal() {
            if (!isLogin || !loginId) {
                setUser(null);
                setBookings([]);
                setAllReviews([]);
                setTourNos(0);
                setMoneySpent(0);
                setReviews(0);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const [statsResponse, userResponse] = await Promise.all([
                    api.get(`/profile/profile-stats/${loginId}`),
                    api.get(`/users/getUser/${loginId}`)
                ]);
                if (!isCurrent) return;
                const stats = statsResponse.data;
                setUser(userResponse.data.data);
                setTourNos(stats.tours || 0);
                setMoneySpent(stats.TotalSpent || 0);
                setReviews(stats.reviews || 0);
                setBookings(stats.bookings || []);
                setAllReviews(stats.allReviews || []);
            } catch (err) {
                if (isCurrent) console.error("Could not load profile", err);
            } finally {
                if (isCurrent) setLoading(false);
            }
        }
        getVal();
        return () => { isCurrent = false; };
    }, [loginId, isLogin]);

    const handleProfile = () => { setOnbookings(false); setOnreviews(false); };
    const handleBooking = () => { setOnbookings(true); setOnreviews(false); };
    const handleReviews = () => { setOnreviews(true); setOnbookings(false); };

    return (
        <main className="mainprofile">
            <nav className="left-side-profile" aria-label="Profile sections">
                <div className="myProfile"><button aria-pressed={!onbookings && !onreviews} onClick={handleProfile}>My profile</button></div>
                <div className="myBookings"><button aria-pressed={onbookings} onClick={handleBooking}>My bookings</button></div>
                <div className="myReviews"><button aria-pressed={onreviews} onClick={handleReviews}>My reviews</button></div>
            </nav>
            <section className="right-side-profile" aria-live="polite">
                {!onbookings && !onreviews && <>
                    <div className="profile-overview">
                        <div className="profilepic"><Profilephoto user={user || {}} token={token} setToken={setToken} /></div>
                        <div className="profile-summary-heading">
                            <h1>Your travel snapshot</h1>
                            <p>A quick look at the journeys you’ve made with TripNest.</p>
                        </div>
                        {loading ? <p className="profile-state">Loading your profile…</p> : <div className="profileinfo">
                            <div className="totalTourCount">
                                <span className="profile-stat-icon" aria-hidden="true">✈</span>
                                <span className="profile-stat-label">TOURS BOOKED</span>
                                <strong className="profile-stat-value">{tourNos}</strong>
                            </div>
                            <div className="totalReviewCount">
                                <span className="profile-stat-icon" aria-hidden="true">★</span>
                                <span className="profile-stat-label">YOUR REVIEWS</span>
                                <strong className="profile-stat-value">{reviews}</strong>
                            </div>
                            <div className="totalMoneySpent">
                                <span className="profile-stat-icon" aria-hidden="true">₹</span>
                                <span className="profile-stat-label">MONEY SPENT</span>
                                <strong className="profile-stat-value">{Number(moneySpent).toLocaleString("en-IN")}</strong>
                            </div>
                        </div>}
                    </div>
                </>}
                {onbookings && <div className="profilebookings">
                    {loading && <p className="profile-state">Loading your bookings…</p>}
                    {!loading && bookings.length === 0 && <div className="profile-state"><h2>No bookings yet</h2><p>Your booked tours will show up here.</p></div>}
                    {bookings.map((data) => <Bookingcard key={data._id} tourName={data.tour?.name || "Trip"} tourStatus={data.status} guests={data.guests} tourDate={data.bookingDate} tourPrice={data.price} />)}
                </div>}
                {onreviews && <div className="profileReviews">
                    {loading && <p className="profile-state">Loading your reviews…</p>}
                    {!loading && allReviews.length === 0 && <div className="profile-state"><h2>No reviews yet</h2><p>Reviews you leave for your tours will show up here.</p></div>}
                    {allReviews.map((data) => <Reviewcard key={data._id} reviewWritten={data.review} rating={data.rating} tourName={data.tour?.name || "Past experience"} reviewDate={data.createdAt} />)}
                </div>}
            </section>
        </main>
    );
}
