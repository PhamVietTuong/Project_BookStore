using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
	public class SlideShow
	{
		public int Id { get; set; }

		public string UserId { get; set; }
		
		public User User { get; set; }

		public string FileName { get; set; }

		[NotMapped]
		public IFormFile File { get; set; }
	}
}
