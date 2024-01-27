using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using System.Security.Principal;
using Microsoft.AspNetCore.Identity;
using System.Drawing;
using static System.Reflection.Metadata.BlobBuilder;
using static System.Net.Mime.MediaTypeNames;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookStoreContext _context;

		public BooksController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
			return await _context.Books.Include(a => a.Author)
			   .Include(a => a.Publisher)
			   .Include(a => a.Category)
               .Where(a => a.Status)
			   .ToListAsync();
		}

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
			var book = await _context.Books.Include(a => a.Author)
				.Include(a => a.Category).Include(a => a.Publisher).Include(a => a.Promotion)
				.FirstOrDefaultAsync(a => a.Id == id);

			if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
			book.CreateTime = DateTime.Now;
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
			book.Status = false;
			_context.Books.Update(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }

		[HttpGet]
		[Route("listBook")]
		public async Task<ActionResult<IEnumerable<Book>>> GetListBook()
		{
            var books = await _context.Books.Include(a => a.Author)
                                            .Include(a => a.Publisher)
                                            .Include(a => a.Category)
											.Where(a => a.Status)
											.ToListAsync();  

			var rows = new List<BookViewModel>();
			foreach (Book book in books)
            {
                Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel),
				}).FirstOrDefault();



				rows.Add(new BookViewModel
                {
                    Id = book.Id,
                    PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

		[HttpGet("detail/{id}")]
        public async Task<ActionResult<BookViewModel>> GetDetailBook(int id)
		{
            var book = await _context.Books
                         .Include(a => a.Author)
                         .Include(a => a.Category)
                         .Include(a => a.Publisher)
                         .FirstOrDefaultAsync(a => a.Id == id);

			List<Models.Image> images = await _context.Images.Where(i => i.BookId == book.Id).ToListAsync();
			var rating = _context.Ratings.Where(r => r.BookId == book.Id).AsEnumerable().GroupBy(r => r.BookId).Select(x => new
			{
				averageRating = x.Average(r => r.RatingLevel),
				ratingCounts = x.GroupBy(r => r.RatingLevel).ToDictionary(group => group.Key, group => group.Count()),
			}).FirstOrDefault();

			if (book == null)
            {
                return NotFound();
            }

            var detailBook = new BookViewModel
            {
                Id = book.Id,
                PublisherName = book.Publisher.Name,
                AuthorName = book.Author.Name,
                CategoryName = book.Category.Name,
                Name = book.Name,
                Quantity = book.Quantity,
                Description = book.Description,
                Price = book.Price,
				Star = rating?.averageRating ?? 5,
				FiveStar = rating?.ratingCounts.GetValueOrDefault(5) ?? 0,
				FourStar = rating?.ratingCounts.GetValueOrDefault(4) ?? 0,
				ThreeStar = rating?.ratingCounts.GetValueOrDefault(3) ?? 0,
				TwoStar = rating?.ratingCounts.GetValueOrDefault(2) ?? 0,
				OneStar = rating?.ratingCounts.GetValueOrDefault(1) ?? 0,
				TotalRating = rating?.ratingCounts.Count() ?? 0,
				Status = book.Status,
				Images = images.Select(img => new ImageViewModel
				{
					FileName = img.FileName,
					FilePDF = img.FilePDF
				}).ToList(),

			};

            return Ok(detailBook);
        }

		//[HttpPut("updateFavourite/{id}")]
		//public async Task<IActionResult> UpdateFavourite(int id, Book book)
		//{
		//	if (id != book.Id)
		//	{
		//		return BadRequest();
		//	}

		//	var existingBook = await _context.Books.FindAsync(id);

		//	if (existingBook == null)
		//	{
		//		return NotFound();
		//	}

		//	existingBook.Favourite = book.Favourite;

		//	try
		//	{
		//		await _context.SaveChangesAsync();
		//	}
		//	catch (DbUpdateConcurrencyException)
		//	{
		//		if (!BookExists(id))
		//		{
		//			return NotFound();
		//		}
		//		else
		//		{
		//			throw;
		//		}
		//	}

		//	return NoContent();
		//}

		//[HttpGet]
		//[Route("listFavourite")]
		//public async Task<ActionResult<IEnumerable<Book>>> ListFavourite()
		//{
		//	var books = await _context.Books.Include(a => a.Promotion)
		//									.Where(a => a.Status && a.Favourite)
		//									.ToListAsync();

		//	var rows = new List<ListFavouriteViewModel>();
		//	foreach (Book book in books)
		//	{
		//		Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
		//		var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
		//		{
		//			averageRating = x.Average(r => r.RatingLevel)
		//		}).FirstOrDefault();

		//		rows.Add(new ListFavouriteViewModel
		//		{
		//			Id = book.Id,
		//			PromotionPercentage = book.Promotion.PromotionPercentage,
		//			Name = book.Name,
		//			Price = book.Price,
		//			Favourite = book.Favourite,
		//			Star = rating?.averageRating ?? 5,
		//			Status = book.Status,
		//			FileName = image?.FileName,
		//			PriceAfterPromotion = book.Price * ((100-book.Promotion.PromotionPercentage)/100)
		//		});
		//	}
		//	return Ok(rows);
		//}

        [HttpGet]
        [Route("getTheListByPrice")]
        public async Task<ActionResult<IEnumerable<Book>>> getTheListByPrice(double FromPrice, double ToThePrice)
		{
			var listBook = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.Where(a=> a.Price >= FromPrice && a.Price <= ToThePrice)
											.ToListAsync();
            var rows = new List<BookViewModel>();
            foreach (Book book in listBook)
            {
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel)
				}).FirstOrDefault();

				rows.Add(new BookViewModel
                {
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
            }
			return Ok(rows);
        }


		[HttpGet]
		[Route("getTheListByCategory")]
		public async Task<ActionResult<IEnumerable<Book>>> getTheListByCategory(string CategoryName)
		{
			var listBook = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.Where(a => a.Category.Name == CategoryName)
											.ToListAsync();
			var rows = new List<BookViewModel>();
			foreach (Book book in listBook)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel)
				}).FirstOrDefault();

				rows.Add(new BookViewModel
				{
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

		[HttpGet]
		[Route("descendingPrice")]
		public async Task<ActionResult<IEnumerable<Book>>> DescendingPrice()
		{
			var books = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.OrderByDescending(a => a.Price)
											.ToListAsync();

			var rows = new List<BookViewModel>();
			foreach (Book book in books)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel),
				}).FirstOrDefault();



				rows.Add(new BookViewModel
				{
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

		[HttpGet]
		[Route("ascendingPrice")]
		public async Task<ActionResult<IEnumerable<Book>>> AscendingPrice()
		{
			var books = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.OrderBy(a => a.Price)
											.ToListAsync();

			var rows = new List<BookViewModel>();
			foreach (Book book in books)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel),
				}).FirstOrDefault();



				rows.Add(new BookViewModel
				{
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

		[HttpGet]
		[Route("productNew")]
		public async Task<ActionResult<IEnumerable<Book>>> ProductNew()
		{
			var books = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.OrderByDescending(a => a.CreateTime)
											.ToListAsync();

			var rows = new List<BookViewModel>();
			foreach (Book book in books)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel),
				}).FirstOrDefault();



				rows.Add(new BookViewModel
				{
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

		[HttpGet]
		[Route("highestQuantitySold")]
		public async Task<ActionResult<IEnumerable<Book>>> HighestQuantitySold()
		{
			var books = await _context.Books.Include(a => a.Author)
											.Include(a => a.Publisher)
											.Include(a => a.Category)
											.Where(a => a.Status)
											.OrderByDescending(a => a.QuantitySold)
											.ToListAsync();

			var rows = new List<BookViewModel>();
			foreach (Book book in books)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == book.Id);
				var rating = _context.Ratings.Where(r => r.BookId == book.Id).GroupBy(r => r.BookId).Select(x => new
				{
					averageRating = x.Average(r => r.RatingLevel),
				}).FirstOrDefault();



				rows.Add(new BookViewModel
				{
					Id = book.Id,
					PublisherName = book.Publisher.Name,
					AuthorName = book.Author.Name,
					CategoryName = book.Category.Name,
					Name = book.Name,
					Quantity = book.Quantity,
					Description = book.Description,
					Price = book.Price,
					Star = rating?.averageRating ?? 5,
					Status = book.Status,
					FileName = image?.FileName,
					FilePDF = image?.FilePDF
				});
			}
			return Ok(rows);
		}

	}
}
