using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
	public class Comment
	{
		public Guid Id { get; set; }

		//[ForeignKey("ParentComment")]
		public Guid? ParentCommentId { get; set; }

		[ForeignKey("ParentCommentId")]
		public Comment ParentComment { get; set; }

		public Guid BookId { get; set; }
		public Book Book { get; set; }

		public Guid UserId { get; set; }
		public User User { get; set; }

		public string Content { get; set; }

		public DateTime Date { get; set; }



	}
}
