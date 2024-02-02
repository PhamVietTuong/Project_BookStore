using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using System.Net;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public FavouritesController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/Favourites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favourite>>> GetFavourite()
        {
            return await _context.Favourites.ToListAsync();
        }

        // GET: api/Favourites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favourite>> GetFavourite(int id)
        {
            var favourite = await _context.Favourites.FindAsync(id);

            if (favourite == null)
            {
                return NotFound();
            }

            return favourite;
        }

        // PUT: api/Favourites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavourite(int id, Favourite favourite)
        {
            if (id != favourite.Id)
            {
                return BadRequest();
            }

            _context.Entry(favourite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavouriteExists(id))
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

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Favourite>> PostFavourite(Favourite favourite)
        {
			var existingFavourite = await _context.Favourites
						.FirstOrDefaultAsync(f => f.UserId == favourite.UserId && f.BookId == favourite.BookId);

			if (existingFavourite == null)
			{
				_context.Favourites.Add(favourite);
				await _context.SaveChangesAsync();

				return CreatedAtAction("GetFavourite", new { id = favourite.Id }, favourite);
			}
			else
			{
				_context.Favourites.Remove(existingFavourite);
				await _context.SaveChangesAsync();

				return Ok("Đã xóa yêu thích");
			}
		}

        // DELETE: api/Favourites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int id)
        {
            var favourite = await _context.Favourites.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }

            _context.Favourites.Remove(favourite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavouriteExists(int id)
        {
            return _context.Favourites.Any(e => e.Id == id);
        }

		[HttpGet("{userId}/{bookId}")]
		public async Task<ActionResult<Favourite>> GetFavouriteUserBook(string userId, int bookId)
		{
			var favourite = await _context.Favourites.FirstOrDefaultAsync(a => a.UserId == userId && a.BookId == bookId);

			if (favourite == null)
			{
				return NotFound();
			}

			return favourite;
		}
	}
}
