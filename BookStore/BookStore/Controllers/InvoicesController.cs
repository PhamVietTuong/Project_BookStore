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
    public class InvoicesController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public InvoicesController(BookStoreContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoice()
        {
            return await _context.Invoices.ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }

		[HttpGet("ListOfOrder/{str}")]
		//[Route("ListOfOrder")]
		public async Task<ActionResult<IEnumerable<Invoice>>> ListOfOrder(string str)
		{
            var invoice = await _context.Invoices.ToListAsync();
            invoice = await _context.Invoices.Include(i => i.User)
                .Where(i => str == "default" ? true
                : str == "ordered" ? i.ApproveOrder == "Đã đặt"
                : str == "confirmed" ? i.ApproveOrder == "Đã xác nhận"
                : str == "transported" ? i.ApproveOrder == "Đang vận chuyển"
                : str == "delivered" ? i.ApproveOrder == "Đã giao"
                : str == "canceled" ? i.ApproveOrder == "Đã hủy" : true).ToListAsync();

            var detailInvoice =await _context.InvoiceDetails
					.Include(i => i.Book)
					.Include(i => i.Invoice).ToListAsync();

			var listInvoice = new List<InvoicesViewModel>();
            foreach(Invoice item in invoice)
            {
				var chuoi = "";
                var ngay = "";
                var thang = "";
                var nam = "";
                var time = "";
				ngay = ngay + item.IssuedDate.Day;
				thang = thang + item.IssuedDate.Month;
				nam = nam + item.IssuedDate.Year;
				List<string> tempList = new List<string>();
				foreach (InvoiceDetail detail in detailInvoice)
                {
                    if(detail.Invoice.Id == item.Id)
                    {                      
						tempList.Add(detail.Book.Name);
					}
					
				}
                time = ngay +"/"+ thang +"/"+ nam;
				chuoi = string.Join(", ", tempList);
				listInvoice.Add(new InvoicesViewModel
                {
                    Id = item.Id,
                    Code = item.Code,
                    IssuedDate = time,
                    ShippingAddress = item.ShippingAddress,
                    ShippingPhone = item.ShippingPhone,
                    Total = item.Total,
                    ApproveOrder = item.ApproveOrder,
                    BookName = chuoi,
                    Status = item.Status
                });       
            }
			return Ok(listInvoice);
		}

		[HttpDelete("Canceled/{id}")]
		public async Task<IActionResult> Canceled(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);
			
			if (invoice == null)
			{
				return NotFound();
			}

			invoice.ApproveOrder = "Đã hủy";
			_context.Invoices.Update(invoice);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
