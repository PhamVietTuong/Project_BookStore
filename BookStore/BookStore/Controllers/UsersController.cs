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
using BookStore.Helpers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;
using System.Data.OleDb;

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

		public UsersController(
			BookStoreContext context,
			UserManager<User> userManager,
			RoleManager<IdentityRole> roleManager,
			IConfiguration configuration
			)
		{
			_context = context;
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			//return await _userManager.Users.ToListAsync();
			var users = await _userManager.Users
				.Where(u => u.Status)
				.ToListAsync();
			List<UserViewModel> list = new List<UserViewModel>();
			foreach (var user in users)
			{
				list.Add(new UserViewModel
				{
					Id = user.Id,
					UserName = user.UserName,
					FullName = user.FullName,
					Address = user.Address,
					Email = user.Email,
					Status = user.Status,

				});
			}
			return Ok(list);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetUser(string id)
		{
			return await _userManager.FindByIdAsync(id);

		}
		
		[HttpPut("{id}")]
		public async Task<IActionResult> PutUser(string id ,UserViewModel userViewModel)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			// Update user properties
			user.UserName = userViewModel.UserName;
			user.FullName = userViewModel.FullName;
			user.Address = userViewModel.Address;
			user.Email = userViewModel.Email;
			user.Birthday = userViewModel.Birthday;
			user.PhoneNumber = userViewModel.PhoneNumber;
			user.Status = userViewModel.Status;

			var result = await _userManager.UpdateAsync(user);
			if (result.Succeeded)
			{
				return Ok(); // Successful update
			}
			else
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Unable to update user.");
			}
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			user.Status = false;
			_context.Users.Update(user);
			var result = await _context.SaveChangesAsync();
			if (result > 0)
			{
				return Ok();
			}
			else
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Unable to");
			}
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
					var UserId = user.Id.ToString();
					var authClaims = new List<Claim>
					{
						new Claim(ClaimTypes.Name, user.UserName),
						new Claim(ClaimTypes.NameIdentifier, UserId),
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
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
						userRoles = userRoles.ToList(),
						userId = UserId,
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
				Status = true

			};
			var result = await _userManager.CreateAsync(user, re.PassWord);

			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);

			if (!await _roleManager.RoleExistsAsync("Admin"))
				await _roleManager.CreateAsync(new IdentityRole("Admin"));

			if (!await _roleManager.RoleExistsAsync("User"))
				await _roleManager.CreateAsync(new IdentityRole("User"));

			if (await _roleManager.RoleExistsAsync("User"))
			{
				await _userManager.AddToRoleAsync(user, "User");
			}

			return Ok();
		}

		[HttpPost]
		[Route("register-admin")]
		public async Task<IActionResult> RegisterAdmin(string Username, string Password, string Email, bool Status)
		{
			var userExists = await _userManager.FindByNameAsync(Username);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = Username,
				Status = Status
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

		[HttpGet]
		[Route("reset-password-token")]
		public async Task<IActionResult> ResetPasswordToken(string Username)
		{
			var user = await _userManager.FindByNameAsync(Username);
			if(user==null)
			{
				return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "User does not exists" });
			}
			var token = await _userManager.GeneratePasswordResetTokenAsync(user);
			return Ok(new { token = token });
		}
		[HttpPost]
		[Route("reset-password-user")]
		public async Task<IActionResult> ResetPasswordUser(ResetPasswordModel model)
		{
			var user = await _userManager.FindByNameAsync(model.Username);
			if (user == null)
			{
				return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "User does not exists" });
			}
			if(string.Compare(model.NewPassword, model.ConfirmPassword)!=0)
			{
				return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "The new password and cofirm new password does not match" });
			}
			if (string.IsNullOrEmpty(model.Token))
			{
				return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Invail Token" });
			}
			var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
			if(!result.Succeeded )
			{
				var errors = new List<string>();
				foreach(var error in result.Errors)
				{
					errors.Add(error.Description);
				}
				return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = string.Join(",",errors) });
			}
			return Ok(new Response { Status = "Success", Message = "Password Reseted Successfully" });
		}
		private bool UserExists(string id)
		{
			return _context.Users.Any(e => e.Id == id);
		}
	}
}
