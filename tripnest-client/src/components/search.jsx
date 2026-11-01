import SearchableSelect from "./SearchableSelect"; "./SearchableSelect";
function Search() {
    const destinations = [];
    var requestOptions = {
        method: 'GET',
    };
    fetch("https://api.geoapify.com/v1/boundaries/part-of?id=51607209473f7d52c059d36425f14d644440f00101f9012c25800000000000c002089203094d616e68617474616e&geometry=geometry_1000&apiKey=f9ca3927e5e549b68f22aec7ff9b6ad5", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    return (
        <>
            <div className="search">
                <div className="box1"><label htmlFor="from">Enter the From Destination:</label>
                    <SearchableSelect options={destinations} />
                </div>
                <div className="box1">Date</div>
                <div className="box1">Guests</div>
                <input type="text" className="entervalue" placeholder="Search for a tour" aria-label="Search for a tour" />
            </div>
        </>
    )
};
export default Search;
