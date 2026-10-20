import { useState } from "react";
import "./recomendations.css";
import SearchableSelect from "./SearchableSelect";
import axios from "axios";
export default function Recomendations() {
    const [isFlight, setIsFlight] = useState(false);
    const [cabinClass, setCabinClass] = useState('Economy');
    const [fromDest, setFromDest] = useState("");
    const [toDest, setToDest] = useState("");
    const [departDate, setDepartDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [flights, setFlights] = useState([]);
    const handleFlights = () => {
        setIsFlight(!isFlight);
    }
    const indianAirports = [
        "Ahmedabad - Sardar Vallabhbhai Patel (AMD)",
        "Amritsar - Sri Guru Ram Dass Jee (ATQ)",
        "Bengaluru - Kempegowda International (BLR)",
        "Bhopal - Raja Bhoj Airport (BHO)",
        "Bhubaneswar - Biju Patnaik International (BBI)",
        "Chandigarh - Chandigarh International (IXC)",
        "Chennai - Chennai International (MAA)",
        "Coimbatore - Coimbatore International (CJB)",
        "Delhi - Indira Gandhi International (DEL)",
        "Goa - Manohar International Mopa (GOX)",
        "Goa - Dabolim Airport (GOI)",
        "Guwahati - Lokpriya Gopinath Bordoloi (GAU)",
        "Hyderabad - Rajiv Gandhi International (HYD)",
        "Indore - Devi Ahilyabai Holkar (IDR)",
        "Jaipur - Jaipur International (JAI)",
        "Kochi - Cochin International (COK)",
        "Kolkata - Netaji Subhash Chandra Bose (CCU)",
        "Kozhikode - Calicut International (CCJ)",
        "Lucknow - Chaudhary Charan Singh (LKO)",
        "Mangaluru - Mangaluru International (IXE)",
        "Mumbai - Chhatrapati Shivaji Maharaj (BOM)",
        "Nagpur - Dr. Babasaheb Ambedkar (NAG)",
        "Patna - Jay Prakash Narayan (PAT)",
        "Pune - Pune International (PNQ)",
        "Raipur - Swami Vivekananda Airport (RPR)",
        "Ranchi - Birsa Munda Airport (IXR)",
        "Srinagar - Srinagar International (SXR)",
        "Surat - Surat International (STV)",
        "Thiruvananthapuram - Trivandrum Int. (TRV)",
        "Tiruchirappalli - Trichy International (TRZ)",
        "Varanasi - Lal Bahadur Shastri (VNS)",
        "Visakhapatnam - Visakhapatnam International (VTZ)"
    ];

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3002/api/v1/flights/search',
                {
                    origin: { fromDest },
                    destination: { toDest },
                    departureDate: { departDate },
                    passengers: { passengers },
                    cabinClass: { cabinClass }
                }
            );
            setFlights(response.data.flights);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    }
    return (
        <>
            <div className="Services">
                <div className="Flights"><button type="button" aria-expanded={isFlight} aria-pressed={isFlight} onClick={handleFlights}>Flights</button></div>
                <div className="hotels"><button>Hotels</button></div>
                <div className="restaurents"><button>Restaurents</button>
                </div>
                <div className="BookingHotel"></div>
                <div className="BookingRest"></div>
            </div>
            {isFlight && (
                <div className="BookingFlight">
                    {/* Flex container holding the left and right columns */}
                    <div className="totalflight">

                        <div className="flightleft">
                            <div className="form-group">
                                <label htmlFor="from">Enter the From Destination:</label>
                                {/* 
                                <input
                                    id="from"
                                    type="text"
                                    value={fromDest}
                                    onChange={(e) => setFromDest(e.target.value)}
                                /> */}
                                <SearchableSelect options={indianAirports} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="to">Enter the To Destination:</label>
                                {/* <input
                                    id="to"
                                    type="text"
                                    value={toDest}
                                    onChange={(e) => setToDest(e.target.value)}
                                /> */}
                                <SearchableSelect options={indianAirports} />
                            </div>
                            <div>
                                <label htmlFor="depart-date">Depart Date:</label>
                                <input
                                    id="depart-date"
                                    type="date"
                                    value={departDate}
                                    onChange={(e) => setDepartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flightright">
                            <div className="form-group">
                                <label htmlFor="passengers">Enter no of passengers:</label>
                                <input
                                    id="passengers"
                                    type="number"
                                    value={passengers}
                                    onChange={(e) => setPassengers(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cabin-select">Enter the Cabin class:</label>
                                <select
                                    id="cabin-select"
                                    value={cabinClass}
                                    onChange={(e) => setCabinClass(e.target.value)}
                                >
                                    <option value="Economy">Economy Class</option>
                                    <option value="Business">Business Class</option>
                                    <option value="FirstClass">First Class</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* Bottom container for the full width button */}
                    <div className="flightbottom">
                        <button className="submit" onClick={handleSubmit}>Submit</button>
                    </div>

                    {flights.length > 0 && flights.map((flight) => (
                        <div key={flight.id}>
                            <h3>{flight.owner || "Airline unavailable"}</h3>

                            <p>
                                Price: {flight.currency} {flight.price}
                            </p>

                            <p>Offer ID: {flight.id}</p>

                            <button onClick={() => console.log(flight)}>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
