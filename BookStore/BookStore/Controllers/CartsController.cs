using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public CartsController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }

		[HttpGet]
		[Route("listCart")]
		public async Task<ActionResult<IEnumerable<Cart>>> GetListCart()
		{
			var carts = await _context.Carts.Include(a => a.User)
											.Include(a => a.Book)
											.ToListAsync();

			var rows = new List<CartViewModel>();
			foreach (Cart cart in carts)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == cart.Book.Id);
                Promotion promotion = await _context.Promotions.FirstOrDefaultAsync(i => i.Id == cart.Book.PromotionId);
                rows.Add(new CartViewModel
                {
                    Id = cart.Id,
                    BookId = cart.Book.Id,
                    BookName = cart.Book.Name,
                    Quantity = cart.Quantity,
                    MaxQuantity = cart.Book.Quantity,
                    FileName = image?.FileName,
                    FilePDF = image?.FilePDF,
                    Price = cart.Book.Price,
                    PromotionPercentage = promotion.PromotionPercentage,
                    Selected = cart.Selected,
                });
			}
			return Ok(rows);
		}

		[HttpPost]
		[Route("createCart")]
		public async Task<ActionResult<Cart>> CreateCart(Cart cart)
		{
            var existingCart =  _context.Carts.SingleOrDefault(c => c.BookId == cart.BookId);
            if (existingCart != null)
            {

				existingCart.Quantity += cart.Quantity;
				_context.Entry(existingCart).State = EntityState.Modified;
			}
			else
			{
				_context.Carts.Add(cart);
			}
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
		}

		[HttpPut("updateQuantity/{id}")]
		public async Task<IActionResult> UpdateQuantity(int id, Cart cart)
		{
			if (id != cart.Id)
			{
				return BadRequest();
			}

			var existingCart = await _context.Carts.FindAsync(id);

			if (existingCart == null)
			{
				return NotFound();
			}

			existingCart.Quantity = cart.Quantity;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CartExists(id))
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

		[HttpPut("updateSelected/{id}")]
		public async Task<IActionResult> UpdateSelected(int id, Cart cart)
		{
			if (id != cart.Id)
			{
				return BadRequest();
			}

			var existingCart = await _context.Carts.FindAsync(id);

			if (existingCart == null)
			{
				return NotFound();
			}

			existingCart.Selected = cart.Selected;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CartExists(id))
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
	}
}
