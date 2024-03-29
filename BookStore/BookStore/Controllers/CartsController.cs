﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using BookStore.Helpers;

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
                cart.UserId = User.GetUserId().ToString();
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

		[HttpPost]
		[Route("Pay")]
		public async Task<ActionResult<Cart>> Pay([FromBody] Invoice InvoiceRequest)
		{
			var userId = User.GetUserId().ToString();
			if (userId != null)
			{
				var carts = await _context.Carts.Include(c => c.User).Include(c => c.Book)
										  .Where(c => c.UserId == userId).ToListAsync();
				Invoice invoice = new Invoice()
				{
					Code = DateTime.Now.ToString("yyMMddhhmmss"),
					UserId = userId,
					IssuedDate = DateTime.Now,
					Total = InvoiceRequest.Total,
					ShippingAddress= InvoiceRequest.ShippingAddress,
					ShippingPhone= InvoiceRequest.ShippingPhone,
					ApproveOrder = "Đã đặt",
					CreateTime = DateTime.Now,
					Status = true
				};
				_context.Invoices.Add(invoice);
				await _context.SaveChangesAsync();

				foreach (Cart item in carts)
				{
					InvoiceDetail detail = new InvoiceDetail()
					{
						InvoiceId = invoice.Id,
						BookId = item.BookId,
						Quantity = item.Quantity,
						UnitPrice = item.Book.Price
					};
					item.Book.Quantity -= item.Quantity;
					item.Book.QuantitySold += item.Quantity;
					_context.InvoiceDetails.Add(detail);
					_context.Books.Update(item.Book);
					_context.Carts.Remove(item);
				}
			}
			await _context.SaveChangesAsync();
			return Ok();
		}

		[HttpGet("PaymentList/{userId}")]
		public async Task<ActionResult<Cart>> PaymentList(string userId)
		{
			var carts= await _context.Carts.Include(a => a.User).Include(a => a.Book).Where(a => a.UserId == userId).ToArrayAsync();

			var rows = new List<PaymentViewModel>();
			foreach (Cart cart in carts)
			{
				Models.Image image = await _context.Images.FirstOrDefaultAsync(i => i.BookId == cart.Book.Id);
				Promotion promotion = await _context.Promotions.FirstOrDefaultAsync(i => i.Id == cart.Book.PromotionId);
				rows.Add(new PaymentViewModel
				{
					Id = cart.Id,
					BookName = cart.Book.Name,
					Quantity = cart.Quantity,
					Images = image.FileName,
					Price = cart.Book.Price,
					PromotionPercentage = (cart.Quantity *cart.Book.Price) * (promotion.PromotionPercentage/100),
					Selected = cart.Selected,
				});
			}
			return Ok(rows);
		}
	}
}
