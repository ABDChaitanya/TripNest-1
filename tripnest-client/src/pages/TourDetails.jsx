import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ooty from "./../assets/ooty.png";
import Testimonials from "../components/Testimonials";
import Reviewform from "../components/Reviewform";
import Checkoutform from "../components/Checkoutform";
import "./tourdetails.css";
// import "./TourDetails.css"; // Separate custom CSS file

function TourDetails({ loginId }) {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [review, setReview] = useState([]);
  const [bookingId,setBookingId] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  //new Date(Date.now()).toISOString().split('T')[0]
  const [bookingData, setBookingData] = useState({
    user: `${loginId}`,
    date: new Date(Date.now()).toISOString().split('T')[0],
    guests: 1,
    tour: `${id}`
  });

  useEffect(() => {
    async function getTour() {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    getTour();
  }, [id]);
  useEffect(() => {
    async function getReview() {
      try {
        const res = await api.get(`/reviews/?tour=${id}&&sort=-rating`);
        setReview(res.data.data.docs);
      } catch (err) {
        console.log(err);
      }
    }
    getReview();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value, tour: id, user: `${loginId}`}));
  };
  const handleReviewData1 = async (e) => {
    e.preventDefault;
    try {
      const res = await api.post("/reviews/", {
        review: e.comment,
        rating: e.rating,
        tour: id,
        user: `${loginId}`
      });
    } catch (err) {
      console.log(err);
    }

  }
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(bookingData);
      const res = await api.post('/bookings/createBooking', {
        user: bookingData.user,
        date: bookingData.date,
        guests: bookingData.guests,
        price: tour.price,
        tour: bookingData.tour
      })
      setBookingId(res.data.newBooking.id);
    } catch (err) {
      console.log(err);
    }
  };
  if (!tour) return <h1 className="tour-loading-text">Loading...</h1>;
  
  return (
    <>
      <div className="tour-page-wrapper">

        {/* Hero Banner Section */}
        <header
          className="tour-hero-banner"
          style={{ backgroundImage: `url(${ooty})` }}
        >
          <div className="hero-gradient-overlay" />
          <div className="hero-banner-content">
            {tour.category && <span className="tour-category-badge">{tour.category}</span>}
            <h1 className="tour-main-title">{tour.title}</h1>
            <p className="tour-meta-info">
              {/* 📍 {tour.startLocation || tour.location || "Featured Destination"} &bull;  */}
              🗓️ {tour.duration ? `${tour.duration} Days` : "Flexible Duration"} &bull;
              ⭐ {tour.ratingsAverage.toFixed(2) || "4.8"} ({tour.ratingsQuantity || "12"} reviews)
            </p>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="tour-main-layout">

          {/* LEFT COLUMN */}
          <div className="tour-left-column">

            {/* TOUR OVERVIEW */}
            <div className="content-block">
              <h2 className="section-title">Tour Overview</h2>

              <p className="overview-text">
                {tour.description || tour.summary}
              </p>
            </div>


            {/* BOOK THIS TOUR */}
            <aside className="tour-right-sidebar">

              <div className="sticky-booking-card">

                <h3 className="card-title">
                  Book This Tour
                </h3>

                <div className="booking-price-tag">
                  <span className="price-amount">
                    ${tour.price || "0"}
                  </span>
                  {" "} / person
                </div>

                <form
                  onSubmit={handleBookingSubmit}
                  className="booking-form-element"
                >

                  <div className="input-group">
                    <label
                      htmlFor="date"
                      className="input-label"
                    >
                      Select Date
                    </label>

                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      required
                      className="form-input-field"
                    />
                  </div>


                  <div className="input-group">
                    <label
                      htmlFor="guests"
                      className="input-label"
                    >
                      Number of Guests
                    </label>

                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      max={tour.maxGroupSize || 10}
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      required
                      className="form-input-field"
                    />
                  </div>


                  <button
                    type="submit"
                    className="submit-booking-btn"
                  >
                    Reserve Space Now
                  </button>

                </form>

                <p className="instant-confirm-note">
                  ⚡ Confirmation is immediate.
                </p>

              </div>

            </aside>

          </div>


          {/* RIGHT COLUMN */}
          <div className="tour-right-column">

            {/* REVIEW FORM */}
            <Reviewform
              onReviewSubmit1={handleReviewData1}
            />


            {/* CHECKOUT FORM */}
            <Checkoutform
              price={tour.price}
              bookingId={bookingId}
              tourname={tour.name}
              guests={bookingData.guests}
              totalPrice={tour.price * bookingData.guests}
              date={bookingData.date}
            />

          </div>

        </main>
        <Testimonials tour1={review[0].review} tour2={review[1].review} tour3={review[2].review} />
      </div>
    </>
  );
}

export default TourDetails;
