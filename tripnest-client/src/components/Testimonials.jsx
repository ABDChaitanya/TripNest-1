function Testimonials({ tour1 = "A thoughtful itinerary, beautiful places, and a trip that felt effortless from start to finish.", tour2 = "We found places we would never have discovered on our own. The whole experience was worth remembering.", tour3 = "Easy to plan, lovely to experience, and already making us think about where to go next." }) {
    return (
        <>
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
