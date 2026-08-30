function Testimonials({ tour1, tour2, tour3 }) {
    return (
        <>
            <h1>What our Travellers Say</h1>
            <div className="testimonials">
                <div className="testicard">
                    <div>⭐⭐⭐⭐⭐</div>
                    <div className="TestiSum">{tour1}</div>
                    <div>-Rahul</div>
                </div>
                <div className="testicard">
                    <div>⭐⭐⭐⭐⭐</div>
                    <div className="TestiSum">{tour2}</div>
                    <div>-Preetam</div>
                </div>
                <div className="testicard">
                    <div>⭐⭐⭐⭐⭐</div>
                    <div className="TestiSum">{tour3}</div>
                    <div>-Shourav</div>
                </div>
            </div>
        </>
    )
}
export default Testimonials;