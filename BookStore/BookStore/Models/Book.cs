namespace BookStore.Models
{
	public class Book
	{
		public int Id { get; set; }

		public int PublisherId { get; set; }
		public Publisher Publisher { get; set; }

		public int AuthorId { get; set; }
		public Author Author{ get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

		public int PromotionId { get; set; }
		public Promotion Promotion { get; set; }

		public string Name { get; set; }

		public int Quantity { get; set; }

		public string Description { get; set; }

		public double Price { get; set; }

		public double Star { get; set; }

		public DateTime CreateTime { get; set; }

		public int QuantitySold { get; set; }

		public bool Status{ get; set; }

	}
}
