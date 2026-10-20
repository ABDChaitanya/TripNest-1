import { Link } from "react-router-dom";

function Tourcard({ id, image, rating, title, location, duration, people, difficulty, price }) {
    return (
        <article className="tourCard">
            <div className="tour-card-image-wrap">
                <img src={image} alt={title ? `${title} tour` : "Tour destination"} className="tourimage" />
                {rating != null && <span className="ratings" aria-label={`Rated ${rating} out of 5`}><span aria-hidden="true">★</span> {rating}</span>}
            </div>
            <div className="tour-card-content">
                <h2 className="TourName">{title}</h2>
                {location && <p className="location"><span aria-hidden="true">⌖</span> {location}</p>}
                <div className="tour-card-meta">
                    {duration && <span className="duration"><span aria-hidden="true">◷</span> {duration}</span>}
                    {people && <span className="people"><span aria-hidden="true">♧</span> {people}</span>}
                    {difficulty && <span className="difficulty">{difficulty}</span>}
                </div>
                <div className="tour-card-bottom">
                    <p className="price"><span>From</span> ₹{Number(price || 0).toLocaleString("en-IN")}</p>
                    <Link to={`/tours/${id}`} aria-label={`View ${title || "tour"} details`}>View tour <span aria-hidden="true">→</span></Link>
                </div>
            </div>
        </article>
    );
}

export default Tourcard;
