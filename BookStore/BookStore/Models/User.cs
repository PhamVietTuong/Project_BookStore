using Microsoft.AspNetCore.Identity;

namespace BookStore.Models
{
	public class User : IdentityUser
	{
		public Guid Id { get; set; }

		public Guid UserTypeId { get; set; }
		public UserType UserType { get; set; }

		public string FullName { get; set; }

		public string UserName { get; set; }

		public string Password { get; set; }

		public string Address { get; set; }

		public string Phone { get; set; }

		public string Email { get; set; }

		public int Status { get; set; }

	}
}
