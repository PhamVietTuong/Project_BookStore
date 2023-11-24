namespace BookStore.Models
{
	public class Invoice
	{
		public Guid Id { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public Guid PromotionId { get; set; }
		public Promotion Promotion { get; set;}

		public string Code { get; set; }

		public DateTime IssuedDate { get; set; }

		public string ShippingAddress { get; set; }

		public string ShippingPhone { get; set; }

		public double Total { get; set; }

		public int Status { get; set; }
	}
}
