namespace BookStore.Models
{
	public class Cart
	{
		public Guid Id { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public Guid BookId { get; set; }
		public Book Book { get; set; }

		public int Quantity { get; set; }
	}
}
