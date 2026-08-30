import "./reviewcard.css";
export default function Reviewcard({ tourName,rating,reviewDate,reviewWritten}) {
    return(
    <>
        <div className="review-card1">
            <div className="card-header1">
                <h3 className="tournament-name1">{tourName}</h3>
                <span className="rating-badge1">★ {rating}</span>
            </div>
            <div className="review-info1">
                <p><strong>Review Submitted:</strong> June 15, 2026</p>
                <p className="review-text1"><strong>Review Written:</strong> {reviewWritten}</p>
            </div>
        </div>
    </>
    )
}