function Testimonials({tour1,tour2,tour3}) {
    return (
        <>
        <h1>What our Travellers Say</h1>
       <div className="testimonials">
         <div className="testicard">
            <div>⭐⭐⭐⭐⭐</div>
            <div className="TestiSum">{ "The kashmir trip was Awesome!!!"}</div>
            <div>-Rahul</div>
        </div>
        <div className="testicard">
            <div>⭐⭐⭐⭐⭐</div>
            <div className="TestiSum">{"The Goa trip was far beyond entertaining👌👌"}</div>
            <div>-Preetam</div>
        </div>
        <div className="testicard">
            <div>⭐⭐⭐⭐⭐</div>
            <div className="TestiSum">{"Enjoyed every bit of the Goa trip😍😍😍"}</div>
            <div>-Shourav</div>
        </div>
       </div>
        </>
    )
}
export default Testimonials;