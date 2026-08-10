import Searchbar from './Searchbar.jsx'
import { useEffect, useState } from 'react'
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
function Sortfilter({ search, setSearch, sort, setSort, price, setPrice ,rating,setRating}) {
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterClick = () => {
        setFilterOpen(prev => !prev);
    }

    return (
        <>
            <div className="sortfilter">

                <Searchbar search={search} setSearch={setSearch} />
                <div className="sortfilterboxes">
                    <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Recommended</option>
                        <option value="price">Price:Low to High</option>
                        <option value="-price">Price:High to Low</option>
                        <option value="ratingsAverage">Ratings:Low to High</option>
                        <option value="-ratingsAverage">Ratings:High to Low</option>
                        <option value="-createdAt">Newest</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>

                <button onClick={handleFilterClick}>
                    Filters
                </button>


                {filterOpen &&
                    <div id="mybox" className="filtering" >
                        <h3 className="filterheading">Filters</h3>
                        <div className="price-filter">
                            <h3 className="priceheading">Price Range</h3>
                            <p className="pricepara">₹{price[0]} - ₹{price[1]}</p>
                            <Slider range min={100} max={10000}
                                value={price} onChange={setPrice} railStyle={{ backgroundColor: "#ddd", height: 6 }}
                                trackStyle={[{ backgroundColor: "#2ecc71", height: 6 }]} handleStyle={[
                                    {
                                        borderColor: "#2ecc71",
                                        backgroundColor: "#fff",
                                        width: 20,
                                        height: 20,
                                        opacity: 1
                                    },
                                    {
                                        borderColor: "#2ecc71",
                                        backgroundColor: "#fff",
                                        width: 20,
                                        height: 20,
                                        opacity: 1
                                    }
                                ]}
                            ></Slider>
                        </div>
                        <div className="ratingfilter">
                            <form>
                                <p>Ratings:</p>
                                <div>
                                    <input type="radio" id="4.5&above" name="rating" value="[gte]4.5" checked={rating===4.5} onChange={()=>setRating(4.5)} />
                                    <label htmlFor="4.5&above">4.5 & above</label>
                                </div>

                                <div>
                                    <input type="radio" id="4.0&above" name="rating" value="[gte]4.0" checked={rating===4.0} onChange={()=>setRating(4)}/>
                                    <label htmlFor="4.0&above">4.0 & above</label>
                                </div>

                                <div>
                                    <input type="radio" id="3.5&above" name="rating" value="[gte]3.5" checked={rating===3.5} onChange={()=>setRating(3.5)}/>
                                    <label htmlFor="3.5&above">3.5 & above</label>
                                </div>
                            </form>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
export default Sortfilter;