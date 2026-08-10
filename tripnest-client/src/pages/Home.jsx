import Hero1 from "../components/hero1"
import Search from "../components/search";
import Tourcard from "../components/Tourcard";
import tour from "../../../dev-data/img/new-tour-1.jpg"
import Featuredtours from "../components/Featuredtours";
import Testimonials from "../components/Testimonials";
function Home() {
    return <>
        <div className="Homemain">
            <Hero1 />
            <Search />
            <Featuredtours />
            <Testimonials />
        </div>
    </>
}
export default Home;