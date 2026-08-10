import tour from '../assets/search.png'
import {Link} from "react-router-dom"
function Tourcard({id,image,rating,title,location,duration,people,difficulty,price}){
    return (
        <>
            <div className="tourCard">
                <img src={image} alt="image" className="tourimage"/>
                <div className="ratings">⭐ {rating}</div>
                <div className="TourName">{title}</div>
                <div className="location">📍{location}</div>
                <div className="duration">⌛{duration}</div>
                <div className="people">👥{people}</div>
                <div className="difficulty">{difficulty}</div>
                <div className="price">₹{price}</div>
                <Link to={`/tours/${id}`}>viewmore</Link>
            </div>
        </>
    );
}
export default Tourcard