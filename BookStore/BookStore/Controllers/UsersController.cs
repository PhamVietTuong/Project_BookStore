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

		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			return await _userManager.Users.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetUser(string id)
		{
			return await _userManager.FindByIdAsync(id);
		}


		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login(LoginViewModel login)
		{
			if (ModelState.IsValid)
			{
				var user = await _userManager.FindByNameAsync(login.Username);

				if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
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

				return Unauthorized(new { message = "Invalid username or password" });
			}

			return BadRequest(ModelState);
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(RegisterViewModel re)
		{
			var userExists = await _userManager.FindByNameAsync(re.UserName);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = re.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = re.UserName,
				FullName = re.FullName
			};
			var result = await _userManager.CreateAsync(user, re.PassWord);
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
