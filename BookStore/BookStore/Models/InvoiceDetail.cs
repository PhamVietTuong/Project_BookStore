namespace BookStore.Models
{
	public class InvoiceDetail
	{
		public int Id { get; set; }

		public int InvoiceId { get; set; }
		public Invoice Invoice { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public double UnitPrice { get; set; }

		public int Quantity { get; set; }
	}
}
