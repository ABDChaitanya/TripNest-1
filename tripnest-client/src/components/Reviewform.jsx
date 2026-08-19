import  { useState } from 'react';
 // Make sure to add this CSS stylesheet import

export default function ReviewForm({ onReviewSubmit1 }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !comment.trim()) {
      setError('Please fill in your name, select a star rating, and write a comment.');
      return;
    }
    setError('');
    
    onReviewSubmit1({
      id: Date.now(),
      name,
      avatar: "", 
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: title.trim(),
      comment: comment.trim()
    });

    setName('');
    setRating(0);
    setTitle('');
    setComment('');
  };

  return (
    <div className="review-card-container">
      <h3 className="review-card-heading">Write a Review</h3>
      
      {error && <p className="review-error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="review-form-layout">
        {/* Name Input */}
        <div>
          <label className="review-input-label">Your Name *</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="review-field-input"
            placeholder="John Doe"
          />
        </div>

        {/* Dynamic Star Rating Selection */}
        <div>
          <label className="review-input-label">Your Rating *</label>
          <div className="review-stars-row">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              const isHighlighted = starValue <= (hoverRating || rating);
              return (
                <button
                  type="button"
                  key={index}
                  className={`review-star-trigger ${isHighlighted ? 'star-filled' : 'star-empty'}`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="review-input-label">Review Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="review-field-input"
            placeholder="Summarize your experience"
          />
        </div>

        {/* Review Comments */}
        <div>
          <label className="review-input-label">Review Details *</label>
          <textarea 
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="review-field-textarea"
            placeholder="What did you like or dislike?"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="review-submit-action">
          Submit Review
        </button>
      </form>
    </div>
  );
}
