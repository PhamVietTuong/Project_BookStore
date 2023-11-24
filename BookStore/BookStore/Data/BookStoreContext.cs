using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BookStore.Data
{
    public class BookStoreContext : IdentityDbContext<User>
	{
        public BookStoreContext (DbContextOptions<BookStoreContext> options)
            : base(options)
        {
        }

        public DbSet<BookStore.Models.Author> Authors { get; set; } = default!;

        public DbSet<BookStore.Models.Book> Books { get; set; }

        public DbSet<BookStore.Models.Cart> Carts { get; set; }

        public DbSet<BookStore.Models.Category> Categories { get; set; }

        public DbSet<BookStore.Models.Comment> Comments { get; set; }

        public DbSet<BookStore.Models.Image> Images { get; set; }

        public DbSet<BookStore.Models.Invoice> Invoices { get; set; }

        public DbSet<BookStore.Models.InvoiceDetail> InvoiceDetails { get; set; }

        public DbSet<BookStore.Models.Promotion> Promotions { get; set; }

        public DbSet<BookStore.Models.Publisher> Publishers { get; set; }

        public DbSet<BookStore.Models.Rating> Ratings { get; set; }

        public DbSet<BookStore.Models.Review> Reviews { get; set; }

        public DbSet<BookStore.Models.SlideShow> SlideShows { get; set; }

        public DbSet<BookStore.Models.User> Users { get; set; }

    }
}
