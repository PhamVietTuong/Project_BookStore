namespace BookStore.Models
{
	public class Image
	{
		public int Id { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public string Name { get; set; }

		public string FilePDF { get; set; }	
	}
}
