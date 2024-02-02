namespace BookStore.Models
{
	public class FavouriteViewModel
	{
		public int Id { get; set; }

		public int BookId { get; set; }
		public string Title { get; set; }

		public double Price { get; set; }

		public int Promotion { get; set; }

		public double Start { get; set; }

		public string ImageName { get; set; }
	}
}
