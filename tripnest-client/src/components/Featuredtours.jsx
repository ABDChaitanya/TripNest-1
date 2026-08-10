import Tourcard from "./Tourcard"
import {Link} from "react-router-dom"
import tour from "../../../dev-data/img/new-tour-1.jpg"
function Featuredtours(){
    return(
        <>
        <div className="feauteredTours">
        <Tourcard 
            image={tour}
            rating="4.8"
            title="The playing Knight"
            location="17.22323.24432"
            duration="4-5days"
            people="12 people"
            price="15000"
            />
        <Tourcard 
            image={tour}
            rating="4.7"
            title="The monstrous Night"
            location="123.9332.213"
            duration="7days"
            people="8 people"
            price="30000"
            />      
        <Tourcard 
            image={tour}
            rating="4.5"
            title="Night way to heaven"
            location="832.342.123"
            duration="10days"
            people="10 people"
            price="20000"
            />  
        <Tourcard 
            image={tour}
            rating="4.3"
            title="Devotion tour"
            location="213.432.532"
            duration="3days"
            people="20 people"
            price="10000"
            />    
        <Tourcard 
            image={tour}
            rating="4.4"
            title="Goa trip"
            location="436.34636.345"
            duration="7days"
            people="10 people"
            price="25000"
            />
        <Tourcard 
            image={tour}
            rating="4.8"
            title="The playing Knight"
            location="17.22323.24432"
            duration="4-5days"
            people="12 people"
            price="15000"
            />
            </div>
            <Link to="/tours">View more tours</Link>
        </>
    )
}
export default Featuredtours;