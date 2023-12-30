namespace BookStore.Models
{
	public class BookViewModel
	{
		public int Id { get; set; }

		public string PublisherName { get; set; }
		public Publisher Publisher { get; set; }

		public string AuthorName { get; set; }
		public Author Author { get; set; }

		public string CategoryName { get; set; }
		public Category Category { get; set; }

		public string Name { get; set; }

		public int Quantity { get; set; }

		public string Description { get; set; }

		public double Price { get; set; }

		public bool Favourite { get; set; }

		public double Star { get; set; }

        public string FileName { get; set; }

        public string FilePDF { get; set; }

        public List<ImageViewModel> Images { get; set; }

        public bool Status { get; set; }
	}
}
