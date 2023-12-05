namespace BookStore.Models
{
	public class Rating
	{
		public int Id { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public int RatingLevel { get; set; }
	}
}
