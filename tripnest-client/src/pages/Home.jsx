import Hero1 from "../components/hero1"
import Search from "../components/search";
import Featuredtours from "../components/Featuredtours";
import Testimonials from "../components/Testimonials";
import Recomendations from "../components/Recomendations";
import "./home.css";
function Home() {
    return <>
        <div className="Homemain">
            <Hero1 />
            <main className="home-content">
                <section className="home-featured" id="featured-tours">
                    <div className="home-featured-header">
                        <div className="home-section-heading">
                            <span className="home-kicker">EXPLORE TOURS</span>
                            <h2>Featured Tours</h2>
                        </div>
                        <div className="home-service-panel" aria-label="Travel services"><Recomendations /></div>
                    </div>
                    <div className="home-quick-search"><Search /></div>
                    <Featuredtours />
                </section>
                <section className="home-stories">
                    <div className="home-section-heading">
                        <span className="home-kicker">TRAVEL NOTES</span>
                        <h2>Good trips stay with you</h2>
                    </div>
                    <Testimonials />
                </section>
            </main>
        </div>
    </>
}
export default Home;
