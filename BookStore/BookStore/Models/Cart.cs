namespace BookStore.Models
{
	public class Cart
	{
		public int Id { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public int Quantity { get; set; }
	}
}
