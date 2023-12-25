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
				.Include(a => a.Category).Include(a => a.Publisher)
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
					Favourite = book.Favourite,
					Star = book.Star,
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
                Favourite = book.Favourite,
                Star = book.Star,
                Status = book.Status,
				Images = images.Select(img => new ImageViewModel
				{
					FileName = img.FileName,
					FilePDF = img.FilePDF
				}).ToList(),

			};

            return Ok(detailBook);
        }
	}
}
