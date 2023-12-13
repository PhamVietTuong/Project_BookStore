﻿namespace BookStore.Models
{
	public class UserViewModel
	{
		public string Id { get; set; }

		public string UserName { get; set; }
		public string FullName { get; set; }

		public string Address { get; set; }

		public DateTime Birthday { get; set; }

		public string Email { get; set; }

		public bool Status { get; set; }
	}
}
