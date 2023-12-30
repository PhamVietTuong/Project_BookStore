namespace BookStore.Models
{
	public class Promotion
	{
		public int Id { get; set; }

		public DateTime DateFrom { get; set; }

		public DateTime DateTo { get; set; }

		public double PromotionPercentage { get; set; }
	}
}
