using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using BookStore.Helpers;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

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

		[HttpGet("UserListOfOrder/{str}")]
		//[Route("ListOfOrder")]
		public async Task<ActionResult<IEnumerable<Invoice>>> ListOfOrder(string str) //string useId,
		{
			//var claimsIdentity = User.Identity as ClaimsIdentity;
			//var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
			
			var invoice = await _context.Invoices.ToListAsync();
			var userId = User.GetUserId().ToString();
			if (userId != null)
			{
				invoice = await _context.Invoices.Include(i => i.User)
				.Where(i => str == "default" ? true
				: str == "ordered" ? i.ApproveOrder == "Đã đặt"
				: str == "confirmed" ? i.ApproveOrder == "Đã xác nhận"
				: str == "transported" ? i.ApproveOrder == "Đang vận chuyển"
				: str == "delivered" ? i.ApproveOrder == "Đã giao"
				: str == "canceled" ? i.ApproveOrder == "Đã hủy" : true).Where(i => i.UserId == userId).ToListAsync();
			}

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

		[HttpDelete("UpdateQuantityOrder/{id}")]
		public async Task<IActionResult> Canceled(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);
			var book = await _context.Books.ToListAsync();
			var invoice_Detail = await _context.InvoiceDetails
					  .Include(i => i.Book)
					  .Include(i => i.Invoice)
					  .Where(a => a.InvoiceId == id).ToListAsync();


			if (invoice == null)
			{
				return NotFound();
			}

			foreach (InvoiceDetail details in invoice_Detail)
			{
				book.Where(b => b.Id == details.BookId);
				foreach (Book itembook in book)
				{
					if (itembook.Id == details.BookId)
					{
						itembook.Quantity += details.Quantity;
					}
					_context.Books.Update(itembook);
					await _context.SaveChangesAsync();
				}
			}
			invoice.Status = false;
			_context.Invoices.Update(invoice);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		[HttpGet("ListOfOrder/{str}")]
		//[Route("ListOfOrder")]
		public async Task<ActionResult<IEnumerable<Invoice>>> ListOfOrderAdmin(string str)
		{
			var invoice = await _context.Invoices.ToListAsync();
			invoice = await _context.Invoices.Include(i => i.User)
				.Where(i => str == "default" ? true
				: str == "approveOrder" ? i.ApproveOrder == "Đã đặt"
                : str == "confirmed" ? i.ApproveOrder =="Đã xác nhận"
				: str == "transported" ? i.ApproveOrder == "Đang vận chuyển"
				: str == "delivered" ? i.ApproveOrder == "Đã giao"
				: str == "canceled" ? i.ApproveOrder == "Đã hủy" : i.ApproveOrder == "Đã đặt").ToListAsync();

			var detailInvoice = await _context.InvoiceDetails
					.Include(i => i.Book)
					.Include(i => i.Invoice).ToListAsync();

			var listInvoice = new List<InvoicesViewModel>();
			foreach (Invoice item in invoice)
			{
                var soluong = 0;
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
					if (detail.Invoice.Id == item.Id)
					{
						soluong += detail.Quantity;
						tempList.Add(detail.Book.Name);
					}

				}
				time = ngay + "/" + thang + "/" + nam;
				chuoi = string.Join(", ", tempList);
				listInvoice.Add(new InvoicesViewModel
				{
					Id = item.Id,
					Code = item.Code,
					IssuedDate = time,
					ShippingAddress = item.ShippingAddress,
					ShippingPhone = item.ShippingPhone,
					Total = item.Total,
                    TotalQuantity = soluong,
					ApproveOrder = item.ApproveOrder,
					BookName = chuoi,
					Status = item.Status
				});
			}
			return Ok(listInvoice);
		}

		[HttpDelete("AdminConfirm/{id}")]
		public async Task<IActionResult> AdminConfirm(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);

			if (invoice == null)
			{
				return NotFound();
			}

			invoice.ApproveOrder = "Đã xác nhận";
			_context.Invoices.Update(invoice);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("AdminTransport/{id}")]
		public async Task<IActionResult> AdminTransport(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);

			if (invoice == null)
			{
				return NotFound();
			}

			invoice.ApproveOrder = "Đang vận chuyển";
			_context.Invoices.Update(invoice);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("AdminDeliver/{id}")]
		public async Task<IActionResult> AdminDeliver(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);

			if (invoice == null)
			{
				return NotFound();
			}

			invoice.ApproveOrder = "Đã giao";
			_context.Invoices.Update(invoice);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpGet]
		[Route("statistical")]
		public async Task<ActionResult<IEnumerable<Invoice>>> Statistical(string value)
		{
			var invoices = await _context.Invoices.ToListAsync();

			var invoiceDetails = await _context.InvoiceDetails.ToListAsync();

			DateTime currentDate = DateTime.Now;

			List<StatisticalViewModel> result = new List<StatisticalViewModel>();

			if (value == "day")
			{
				result = invoices
								.Where(i => i.CreateTime.Day == currentDate.Day)
								.GroupBy(i => i.CreateTime.Day)
								.Select(group => new StatisticalViewModel
								{
									Month = "Hôm nay",
									TotalToThis = group.Sum(i => i.Total),
									BooksSoldCount = invoiceDetails
									.Join(group, id => id.InvoiceId, inv => inv.Id, (id, inv) => id)
									.Select(id => id.Quantity)
									.Sum()
								})
								.ToList();

			} else if ( value == "month")
			{
				result = invoices
								.Where(i=> i.CreateTime.Year == currentDate.Year)
								.GroupBy(i => i.CreateTime.Day)
								.Select(group => new StatisticalViewModel
								{
									Month = "Ngày " + group.Key.ToString(),
									TotalToThis = group.Sum(i => i.Total),
									BooksSoldCount = invoiceDetails
									.Join(group, id => id.InvoiceId, inv => inv.Id, (id, inv) => id)
									.Select(id => id.Quantity)
									.Sum()
								})
								.ToList();
			}
			else if ( value == "year" )
			{
				result = invoices
								.Where(i => i.CreateTime.Year == currentDate.Year)
								.GroupBy(i => i.CreateTime.Month)
								.Select(group => new StatisticalViewModel
								{
									Month = "Tháng " + group.Key.ToString(),
									TotalToThis = group.Sum(i => i.Total),
									BooksSoldCount = invoiceDetails
									.Join(group, id => id.InvoiceId, inv => inv.Id, (id, inv) => id)
									.Select(id => id.Quantity)
									.Sum()
								})
								.ToList();
			}

			return Ok(result);
		}

		[HttpDelete("Canceled/{id}")]
		public async Task<IActionResult> UserCanceled(int id)
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
