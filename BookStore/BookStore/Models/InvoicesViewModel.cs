namespace BookStore.Models
{
	public class InvoicesViewModel
	{
		public int Id { get; set; }

		public string Code { get; set; }

		public string IssuedDate { get; set; }

		public string ShippingAddress { get; set; }

		public string ShippingPhone { get; set; }

		public double Total { get; set; }

		public string ApproveOrder { get; set; }

		public string BookName { get; set; }
		public bool Status { get; set; }
	}
}
