import "./bookingcard.css";
export default function bookingcard({tourName,tourStatus,guests,tourDate,tourPrice}) {  
    const date = new Date(tourDate);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ /g, '-');
     
    return (
        <>
            <div className="booking-card1">
                <div className="booking-header1">
                    <h3 className="tour-name1">{tourName}</h3>
                    <span className="payment-status status-paid1">{tourStatus}</span>
                </div>

                <div className="booking-body1">
                    <div className="info-group1">
                        <span className="info-label1">Guests</span>
                        <span className="info-value1">{guests}</span>
                    </div>

                    <div className="info-group1">
                        <span className="info-label1">Tour Date</span>
                        <span className="info-value1">{formattedDate}</span>
                    </div>

                    <div className="info-group1">
                        <span className="info-label1">Total Price</span>
                        <span className="info-value price-tag1">₹{tourPrice}</span>
                    </div>
                </div>
            </div>

        </>
    )
}