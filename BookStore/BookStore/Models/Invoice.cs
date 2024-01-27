namespace BookStore.Models
{
	public class Invoice
	{
		public int Id { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		//public int PromotionId { get; set; }
		//public Promotion Promotion { get; set;}

		public string Code { get; set; }

		public DateTime IssuedDate { get; set; }

		public string ShippingAddress { get; set; }

		public string ShippingPhone { get; set; }

		public double Total { get; set; }

        public string ApproveOrder { get; set; }

		public DateTime CreateTime { get; set; }

		public bool Status { get; set; }
	}
}
