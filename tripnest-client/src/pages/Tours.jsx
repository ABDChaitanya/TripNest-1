import Sortfilter from "../components/Sortfilter";
import { useState, useEffect } from "react";
import api from "./../services/api";
import tourImage from './../assets/new-tour-3.png';
import Tourcard from "../components/Tourcard";
import "./tours.css";

function Tours() {
    const [search, setSearch] = useState("");
    const [tours, setTours] = useState([]);
    const [sort, setSort] = useState("-ratingsAverage");
    const [price, setPrice] = useState([100, 10000]);
    const [rating, setRating] = useState([1]);
    useEffect(() => {
        const timer = setTimeout(() => {
            async function getTours() {
                try {
                    console.log('hi1');
                    const trips = await api.get(`/tours/getTours?search=${search}&sort=${sort}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratingsAverage[gte]=${rating}`);
                    console.log(trips.data);
                    setTours(trips.data.data.tours);

                } catch (err) {
                    console.log(err);
                }
            }
            getTours();
        }, 400);
        return () => clearTimeout(timer);
    }, [search, sort, price, rating]);
    return (
        <>
            <div className="toursPage tours-page-redesign">
                <header className="tours-intro">
                    <span className="tours-kicker">FIND YOUR NEXT GETAWAY</span>
                    <h1 className="toursheading">Explore all tours</h1>
                    <p>Thoughtfully planned experiences to help you make more of every journey.</p>
                </header>
                <Sortfilter search={search} setSearch={setSearch} sort={sort} setSort={setSort} price={price} setPrice={setPrice}
                    rating={rating} setRating={setRating} />
                <div className="tours-results-heading">
                    <h2>Available experiences</h2>
                    <span>{tours.length} {tours.length === 1 ? "tour" : "tours"}</span>
                </div>
                {tours.length > 0 ? <div className="Alltours">{tours.map((tour) => (
                    <Tourcard key={tour._id}
                        id={tour._id}
                        image={tourImage}
                        rating={Number(tour.ratingsAverage || 0).toFixed(1)}
                        title={tour.name}
                        location="india"
                        duration={tour.duration}
                        people="12 people"
                        difficulty={tour.difficulty}
                        price={tour.price}
                    />
                ))}</div> : <div className="tours-empty-state"><span aria-hidden="true">⌕</span><h2>No tours found</h2><p>Try another search or adjust your filters to see more experiences.</p></div>}
            </div>
        </>
    )
}
export default Tours;
