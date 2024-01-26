using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
	public class Image
	{
		public int Id { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public string FileName { get; set; }

		public string FilePDF { get; set; }

		[NotMapped]
		public IFormFile FileImage { get; set; }
	}
}
