import "./reviewcard.css";

export default function Reviewcard({ tourName, rating, reviewDate, reviewWritten }) {
    const date = reviewDate ? new Date(reviewDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;
    return (
        <article className="review-card1">
            <div className="card-header1">
                <h3 className="tournament-name1">{tourName}</h3>
                <span className="rating-badge1"><span aria-hidden="true">★</span> {rating}</span>
            </div>
            <div className="review-info1">
                {date && <p className="review-date1">Reviewed {date}</p>}
                <p className="review-text1">{reviewWritten}</p>
            </div>
        </article>
    );
}
