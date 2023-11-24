using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Data;
using BookStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStore.Dto;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BookStoreContext _context;
		private readonly UserManager<User> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		public UsersController(BookStoreContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _context = context;
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
		}

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

		[HttpPost]
		[Route("login")]
		//public async Task<IActionResult> Login(string Username, string Password)
		public async Task<IActionResult> Login([Bind("Username, Password")] LoginDto account)
		{
			var user = await _userManager.FindByNameAsync(account.Username);
			if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim(ClaimTypes.Name, user.UserName),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
				};

				foreach (var userRole in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, userRole));
				}

				var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

				var token = new JwtSecurityToken(
					issuer: _configuration["JWT:ValidIssuer"],
					audience: _configuration["JWT:ValidAudience"],
					expires: DateTime.Now.AddHours(3),
					claims: authClaims,
					signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
					);

				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(token),
					expiration = token.ValidTo
				});
			}
			return Unauthorized();
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(string Username, string Password, string Email)
		{
			var userExists = await _userManager.FindByNameAsync(Username);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = Username
			};
			var result = await _userManager.CreateAsync(user, Password);
			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);

			return Ok();
		}

		[HttpPost]
		[Route("register-admin")]
		public async Task<IActionResult> RegisterAdmin(string Username, string Password, string Email)
		{
			var userExists = await _userManager.FindByNameAsync(Username);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = Username
			};
			var result = await _userManager.CreateAsync(user, Password);
			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);

			if (!await _roleManager.RoleExistsAsync("Admin"))
				await _roleManager.CreateAsync(new IdentityRole("Admin"));
			if (!await _roleManager.RoleExistsAsync("User"))
				await _roleManager.CreateAsync(new IdentityRole("User"));

			if (await _roleManager.RoleExistsAsync("Admin"))
			{
				await _userManager.AddToRoleAsync(user, "Admin");
			}

			return Ok();
		}
	}
}
