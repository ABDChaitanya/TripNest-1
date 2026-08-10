import Sortfilter from "../components/Sortfilter";
import { useState, useEffect } from "react";
import api from "./../services/api";
import tourImage from './../assets/new-tour-3.png'
import Tourcard from "../components/Tourcard";
function Tours() {
    const [search, setSearch] = useState("");
    const [tours, setTours] = useState([]);
    const [sort,setSort] = useState("-ratingsAverage");
    const [price,setPrice] = useState([100,10000]);
    const [rating,setRating] = useState([1]);
    useEffect(() => {
        const timer = setTimeout(() => {
            async function getTours() {
                try {
                    const trips = await api.get(`/tours/getTours?search=${search}&sort=${sort}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratingsAverage[gte]=${rating}`);
                    setTours(trips.data.data.docs);

                } catch (err) {
                    console.log(err);
                }
            }
            getTours();
        }, 400);
        return () => clearTimeout(timer);
    }, [search,sort,price,rating]);
    return (
        <>
            <div className="toursPage">
                <h1 className="toursheading">Explore All Tours</h1>
                <Sortfilter search={search} setSearch={setSearch} sort={sort} setSort={setSort} price={price} setPrice={setPrice}
                    rating={rating} setRating={setRating}/>
                <div className="Alltours">{tours.map((tour) => (
                    <Tourcard key={tour._id}
                        id={tour._id}
                        image={tourImage}
                        rating={(tour.ratingsAverage).toFixed(1)}
                        title={tour.name}
                        location="india"
                        duration={tour.duration}
                        people="12 people"
                        difficulty={tour.difficulty}
                        price={tour.price}
                    />
                ))}</div>
            </div>
        </>
    )
}
export default Tours;