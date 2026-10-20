import "./bookingcard.css";

export default function Bookingcard({ tourName, tourStatus, guests, tourDate, tourPrice }) {
    const date = tourDate ? new Date(tourDate) : null;
    const formattedDate = date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : "Date unavailable";
    const totalPrice = Number(tourPrice || 0) * Number(guests || 1);
    const statusClass = tourStatus === "paid" ? "status-paid1" : "status-pending1";

    return (
        <article className="booking-card1">
            <div className="booking-header1">
                <h3 className="tour-name1">{tourName}</h3>
                <span className={`payment-status ${statusClass}`}>{tourStatus || "pending"}</span>
            </div>
            <div className="booking-body1">
                <div className="info-group1"><span className="info-label1">Guests</span><span className="info-value1">{guests}</span></div>
                <div className="info-group1"><span className="info-label1">Tour date</span><span className="info-value1">{formattedDate}</span></div>
                <div className="info-group1"><span className="info-label1">Total price</span><span className="info-value1 price-tag1">₹{totalPrice.toLocaleString("en-IN")}</span></div>
            </div>
        </article>
    );
}
