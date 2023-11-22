namespace BookStore.Models
{
	public class Image
	{
		public Guid Id { get; set; }

		public string Name { get; set; }

		public Guid BookId { get; set; }
		public Book Book { get; set; }

		public string FilePDF { get; set; }	
	}
}
