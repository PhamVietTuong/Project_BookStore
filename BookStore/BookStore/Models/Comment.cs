using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
	public class Comment
	{
		public int Id { get; set; }

		//[ForeignKey("ParentComment")]
		public int? ParentCommentId { get; set; }

		[ForeignKey("ParentCommentId")]
		public Comment ParentComment { get; set; }

		public int BookId { get; set; }
		public Book Book { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public string Content { get; set; }

		public DateTime Date { get; set; }
	}
}
