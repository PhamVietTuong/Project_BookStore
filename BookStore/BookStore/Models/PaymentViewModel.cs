namespace BookStore.Models
{
	public class PaymentViewModel
	{
		public int Id { get; set; }

		public string BookName { get; set; }

		public int Quantity { get; set; }

		public double Price { get; set; }

		public string Images { get; set; }

		public double PromotionPercentage { get; set; }

		public bool Selected { get; set; }
	}
}
