import { useState, useEffect } from "react";
function Searchbar({ search, setSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit} className="searchalign">
            <div className="input-group">
                <label htmlFor="username" className="input-label">Tourname</label>
                <input id="username" value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="input-field" placeholder="Search for the Tour" autoComplete="off" />
            </div>
            <div className="searchbutton">
                 <button className="searchbutton1">Search</button>
            </div>
           
        </form>

    )
}
export default Searchbar;