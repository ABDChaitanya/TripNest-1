import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ooty from "./../assets/ooty.png";
import Testimonials from "../components/Testimonials";
// import "./TourDetails.css"; // Separate custom CSS file

function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [review, setReview] = useState([]);
  const [comment,setComment] = useState("");
  const [rating,setRating] = useState(0);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: 1,
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
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handlereviewSubmit = async(e) => {
    e.preventDefault();
    console.log("comment:", comment);
  console.log("rating:", rating);

  await api.post("/reviews", {
    review: comment,
    rating,
    tour: id,
    user:"5c8a24a02f8fb814b56fa193"
  });
  }
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Tour "${tour.name}" reserved for ${bookingData.guests} guest(s) on ${bookingData.date}!`);
  };

  if (!tour) return <h1 className="tour-loading-text">Loading...</h1>;

  return (
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
            ⭐ {tour.ratingsAverage || "4.8"} ({tour.ratingsQuantity || "12"} reviews)
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="tour-main-layout">

        {/* Left Side: Tour Information */}
        ### tour-left-column
        <div className="content-block">
          <h2 className="section-title">Tour Overview</h2>
          <p className="overview-text">{tour.description || tour.summary}</p>
        </div>

        {/* Dynamic Highlights Card */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="highlights-card">
            <h3 className="card-title">Highlights</h3>
            <ul className="highlights-list">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span className="item-text">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dynamic Itinerary Timeline */}
        {tour.itinerary && tour.itinerary.length > 0 && (
          <div className="content-block">
            <h3 className="section-title">Itinerary</h3>
            <div className="timeline-container">
              {tour.itinerary.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="timeline-node" />
                  <h4 className="step-title">{step.day || `Day ${index + 1}`}: {step.title}</h4>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Right Side: Sticky Booking Panel */}
        <aside className="tour-right-sidebar">
          <div className="sticky-booking-card">
            <h3 className="card-title">Book This Tour</h3>
            <div className="booking-price-tag">
              <span className="price-amount">${tour.price || "0"}</span> / person
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form-element">
              <div className="input-group">
                <label htmlFor="date" className="input-label">Select Date</label>
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
                <label htmlFor="guests" className="input-label">Number of Guests</label>
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

              <button type="submit" className="submit-booking-btn">
                Reserve Space Now
              </button>
            </form>
            <p className="instant-confirm-note">⚡ Confirmation is immediate.</p>
          </div>
        </aside>

      </main>
      <Testimonials tour1={review[0]} tour2={review[1]} tour3={review[2]} />
      <div className="review">
        <form onSubmit={handlereviewSubmit}>
          <h1>Write a review</h1>
          <label htmlFor="comment"></label>
          <input id="comment" type="text" value={comment} placeholder="Share the experience" onChange={(e)=>setComment(e.target.value)}/>
          <label htmlFor="ratingvalue">Enter your rating</label>
          <input id="ratingvalue" type="number" value={rating} min="1" max="5" onChange={(e)=>setRating(Number(e.target.value))}/>
          <button className="reviewsubmit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TourDetails;
