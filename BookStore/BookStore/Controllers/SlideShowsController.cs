﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using Microsoft.Extensions.Hosting;
using System.Net.Http.Headers;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideShowsController : ControllerBase
    {
        private readonly BookStoreContext _context;

		public SlideShowsController(BookStoreContext context)
        {
            _context = context;
		}

        // GET: api/SlideShows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SlideShow>>> GetSlideShow()
        {
            return await _context.SlideShows.ToListAsync();
        }

        // GET: api/SlideShows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SlideShow>> GetSlideShow(int id)
        {
            var slideShow = await _context.SlideShows.FindAsync(id);

            if (slideShow == null)
            {
                return NotFound();
            }

            return slideShow;
        }

        // PUT: api/SlideShows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlideShow(int id, SlideShow slideShow)
        {
            if (id != slideShow.Id)
            {
                return BadRequest();
            }

            _context.Entry(slideShow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlideShowExists(id))
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

		// POST: api/SlideShows
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<SlideShow>> PostSlideShow([FromForm] SlideShow slideShow)
		{
			if (slideShow.File != null && slideShow.File.Length > 0)
			{
				var filePath = Path.Combine("wwwroot/images", slideShow.FileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await slideShow.File.CopyToAsync(stream);
				}
			}

			_context.SlideShows.Add(slideShow);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetSlideShow", new { id = slideShow.Id }, slideShow);
		}

		// DELETE: api/SlideShows/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlideShow(int id)
        {
            var slideShow = await _context.SlideShows.FindAsync(id);
            if (slideShow == null)
            {
                return NotFound();
            }

            _context.SlideShows.Remove(slideShow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlideShowExists(int id)
        {
            return _context.SlideShows.Any(e => e.Id == id);
        }
	}
}
