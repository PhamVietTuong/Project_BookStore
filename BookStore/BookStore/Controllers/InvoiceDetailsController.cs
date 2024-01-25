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
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public InvoiceDetailsController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetail()
        {
            return await _context.InvoiceDetails.ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetail>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.Include(i => i.Book).Include(i => i.Invoice).FirstOrDefaultAsync(a => a.Id == id); ;

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }

        // PUT: api/InvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        // POST: api/InvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceDetail>> PostInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            _context.InvoiceDetails.Add(invoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceDetail", new { id = invoiceDetail.Id }, invoiceDetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetails.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetails.Any(e => e.Id == id);
        }

        [HttpGet("detailsOfAnOrder/{id}")]
        public async Task<ActionResult<InvoiceDetail>> detailsOfAnOrder(int id)
        {
			var invoiceDetail = await _context.InvoiceDetails
                      .Include(i => i.Book.Promotion)
					  .Include(i => i.Book.Publisher)
					  .Include(i => i.Invoice.User)
                      .Where(a => a.Invoice.Id == id).ToListAsync();

			if (invoiceDetail == null)
            {
                return NotFound();
            }

            var listInvoiceDetails = new List<InvoiceDetailsViewModel>();
            foreach(InvoiceDetail item in invoiceDetail)
            {
				Models.Image image = _context.Images.FirstOrDefault(x => x.BookId == item.Book.Id);
      
				double totalproduct = (item.Quantity * item.UnitPrice);

                listInvoiceDetails.Add(new InvoiceDetailsViewModel
                {
					Id = item.Id,
					UnitPrice = item.UnitPrice,
					Quantity = item.Quantity,
                    TotalProduct = totalproduct,
                    IdInvoice= item.Invoice.Id,
					ApproveOrder = item.Invoice.ApproveOrder,
                    ProductCode= item.Book.Id,
					PromotionPercentage = (double)(item.Book.Promotion?.PromotionPercentage),
					BookName = item.Book?.Name,
					Images = image?.FileName,
                    Publisher = item.Book.Publisher.Name
				});
			}

            return Ok(listInvoiceDetails);
        }


        [HttpGet("orderer/{id}")]
        public async Task<ActionResult<InvoiceDetail>> orderer(int id)
        {
			var ngay = "";
			var thang = "";
			var nam = "";
			var time = "";
			var orderer = await _context.InvoiceDetails
                .Include(i => i.Book)
                .Include(i => i.Invoice.User)
                .FirstOrDefaultAsync(a => a.Invoice.Id == id);

            ngay += orderer.Invoice.IssuedDate.Day;
            thang += orderer.Invoice.IssuedDate.Month;
            nam += orderer.Invoice.IssuedDate.Year;
            time = ngay +"/"+ thang +"/"+ nam;
			if (orderer == null)
            {
                return NotFound();
            }

            var detailOrderer = new OrdererViewModel
            {
               Code = orderer.Invoice.Code,
               IssuedDate = time,
			   OrderersName = orderer.Invoice.User.FullName,
			   ShippingAddress = orderer.Invoice.ShippingAddress,
			   ShippingPhone = orderer.Invoice.ShippingPhone
			};

            return Ok(detailOrderer);
        }
    }
}
