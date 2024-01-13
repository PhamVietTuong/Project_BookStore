namespace BookStore.Models
{
	public class ReviewViewModel
	{
		public int Id { get; set; }
		public string FullName { get; set; }
		public string Content { get; set; }
		public int CreateTime { get; set; }
        public double Rating { get; set; }
    }
}
