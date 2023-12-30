namespace BookStore.Models
{
	public class CartViewModel
	{
		public int Id { get; set; }

		public string BookName { get; set; }

        public int BookId { get; set; }

        public int Quantity { get; set; }

		public int MaxQuantity { get; set; }

		public string FileName { get; set; }

        public string FilePDF { get; set; }

        public double Price { get; set; }

        public double PromotionPercentage { get; set; }

        public bool Selected { get; set; }
    }
}
