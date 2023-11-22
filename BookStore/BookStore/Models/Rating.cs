namespace BookStore.Models
{
	public class Rating
	{
		public Guid Id { get; set; }

		public Guid BookId { get; set; }
		public Book Book { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public int RatingLevel { get; set; }
	}
}
