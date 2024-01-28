using System.ComponentModel.DataAnnotations;

namespace BookStore.Models
{
	public class ResetPasswordModel
	{
		[Required(ErrorMessage ="Username is required")]
		public string Username { get; set; }

		[Required(ErrorMessage ="NewPassword is required")]
		public string NewPassword { get; set; }

		[Required(ErrorMessage ="ConfirmNewPassword is required")]
		public string ConfirmPassword { get; set;}
		public string Token { get; set;}
	}
}
