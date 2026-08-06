export default function ReviewForm() {
  return (
    <form className="reviewForm">
      <textarea
        className="reviewTextarea"
        placeholder="Write your review..."
      />
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}