using Microsoft.AspNetCore.Identity;

namespace BookStore.Models
{
	public class User : IdentityUser
	{
		public string FullName { get; set; }

		public string Address { get; set; }

        public DateTime Birthday { get; set; }

        public int Status { get; set; }
	}
}
