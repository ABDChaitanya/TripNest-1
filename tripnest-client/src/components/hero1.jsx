import { Link } from "react-router-dom";

function Hero1() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-eyebrow">YOUR NEXT JOURNEY STARTS HERE</span>

        <h1 className="hero-title">
          Discover Your Next
          <br />
          <span>Adventure</span>
        </h1>

        <p className="hero-subtitle">
          Explore extraordinary destinations and create
          <br className="desktop-break" />
          unforgettable memories with TripNest.
        </p>

        <div className="hero-actions">
          <Link to="/tours" className="hero-primary-btn">
            Explore Tours <span aria-hidden="true">→</span>
          </Link>

          <a href="#featured-tours" className="hero-secondary-btn">
            Discover More
          </a>
        </div>

        <div className="hero-trust">
          <span>✦ Curated destinations</span>
          <span>✦ Memorable experiences</span>
          <span>✦ Your journey, your way</span>
        </div>
      </div>
    </section>
  );
}

export default Hero1;