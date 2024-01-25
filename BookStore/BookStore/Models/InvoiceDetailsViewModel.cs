namespace BookStore.Models
{
	public class InvoiceDetailsViewModel
	{
		public int Id { get; set; }
		public double UnitPrice { get; set; }
		public int Quantity { get; set; }

		public double TotalProduct { get; set; }
		// invoice
		public int IdInvoice { get; set; } 
		public double TotalInvoice { get; set; }
		public string ApproveOrder { get; set; }

		public int ProductCode { get; set; }
		//book	
		public double PromotionPercentage { get; set; }
		public string BookName { get; set; }
		public string Images { get; set; }

		public string Publisher { get; set; }
	}
}
