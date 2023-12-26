namespace BookStore.Models
{
	public class ListFavouriteViewModel
	{
		public int Id { get; set; }

		public double PromotionPercentage { get; set; }

		public string Name { get; set; }

		public double Price { get; set; }

		public bool Favourite { get; set; }

		public double Star { get; set; }

		public bool Status { get; set; }

		public string FileName { get; set; }

        public double PriceAfterPromotion { get; set; }
    }
}
