namespace BookStore.Models
{
	public class InvoiceDetail
	{
		public Guid Id { get; set; }

		public Guid InvoiceId { get; set; }
		public Invoice Invoice { get; set; }

		public Guid BookId { get; set; }
		public Book Book { get; set; }

		public double UnitPrice { get; set; }

		public int Quantity { get; set; }


	}
}
