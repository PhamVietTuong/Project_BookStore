namespace BookStore.Models
{
	public class Book
	{
		public Guid Id { get; set; }

		public Guid PublisherId { get; set; }
		public Publisher Publisher { get; set; }

		public Guid AuthorId { get; set; }
		public Author Author{ get; set; }

		public Guid CategoryId { get; set; }
		public Category Category { get; set; }	

		public string Name { get; set; }

		public int Quantity { get; set; }

		public string Description { get; set; }

		public double Price { get; set; }

		public bool Favourite { get; set; }

		public double Star { get; set; }

		public int Status{ get; set; }

	}
}
