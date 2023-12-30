using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
	public class CommentViewModel
	{
		public int Id { get; set; }

		//[ForeignKey("ParentComment")]
		public int? ParentCommentId { get; set; }

		[ForeignKey("ParentCommentId")]
		public Comment ParentComment { get; set; }

		public string BookName { get; set; }
		public Book Book { get; set; }

		public string UserName { get; set; }
		public User User { get; set; }

		public string Content { get; set; }

		public DateTime Date { get; set; }

		public string ImageName { get; set; }

		public bool Status { get; set; }

	}
}
