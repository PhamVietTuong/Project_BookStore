using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public CommentsController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComment()
        {
            return await _context.Comments.Include(a => a.Book).Include(a=> a.User).ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            comment.Date= DateTime.Now;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            comment.Status = false;
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }

		[HttpGet]
		[Route("CommentTheBook")]
		public async Task<ActionResult<IEnumerable<Comment>>> CommentTheBook()
		{
			var newComments = await _context.Comments
				.OrderByDescending(c => c.Date)
                .Include(c => c.Book)
				.Include(c => c.User)
				.ToListAsync();

           var rows = new List<CommentViewModel>();
            foreach (Comment comment in newComments)
            {
                Models.Image image = _context.Images.FirstOrDefault(x => x.BookId == comment.Book.Id);
                rows.Add(new CommentViewModel
                {
                    Id = comment.Id,
					ParentCommentId = comment.ParentCommentId,
					BookName = comment.Book.Name,
					UserName = comment.User.FullName,
					Content = comment.Content,
					Date = comment.Date,
					ImageName = image?.FileName,
                    Status = comment.Status
				});
            }
			return Ok(rows);
		}

		[HttpDelete("CommentDeleted/{id}")]
		public async Task<IActionResult> EditCommentDelete(int id)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null)
			{
				return NotFound();
			}

			comment.Status = true;
			_context.Comments.Update(comment);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
