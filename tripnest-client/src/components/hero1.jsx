import x from "./../assets/hero.png"
import { Link } from "react-router-dom"
function Hero1() {
    return (
        <>
            <section className="heor">
                <div className="heor1">
                    <h1 className="discoversize">Discover your next Adventures</h1>
                    <p className="subtitle">Explore amazing Places With TripNest</p>
                </div>
                <div className="buttonsinHome">
                    <button><Link to="/tours">Explore Tours</Link></button>
                    <button><Link to="/">Learn More</Link></button>
                </div>
            </section>
        </>

    )
}
export default Hero1;