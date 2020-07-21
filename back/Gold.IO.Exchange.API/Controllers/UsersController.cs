using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Ardex.Exchange.API.BusinessLogic;
using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.Enum;
using Ardex.Exchange.API.Domain.User;
using Ardex.Exchange.API.ViewModels;
using Ardex.Exchange.API.ViewModels.Request;
using Ardex.Exchange.API.ViewModels.Response;
using Garey.API.BusinessLogic.Interfaces;
using Garey.API.Domain.User;
using Garey.API.ViewModels;
using Garey.API.ViewModels.Public;
using Garey.API.ViewModels.Request;
using Garey.API.ViewModels.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Ardex.Exchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class UsersController : Controller
    {
        private IUserService UserService { get; set; }
        private IPersonService PersonService { get; set; }
        private IInterestService InterestService { get; set; }
        private IPostingService PostingService { get; set; }


        public UsersController([FromServices]
            IUserService userService,
            IInterestService interestService,
            IPersonService personService,
            IPostingService postingService)
        {
            UserService = userService;
            PersonService = personService;
            InterestService = interestService;
            PostingService = postingService;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> UserSignUp([FromBody] SignUpRequest request)
        {
            var user = UserService.GetAll().FirstOrDefault(x => x.Login == request.Login);

            if (user != null)
                return Json(new ResponseModel {
                    Success = false,
                    Message = "Email already used."
                });

            var person = PersonService.GetAll().FirstOrDefault(x => x.User.Login == request.Login);

            if (person != null)
                return Json(new ResponseModel {
                    Success = false,
                    Message = "Email already used."
                });

            user = new User
            {
                Login = request.Login,
                Password = CreateMD5(request.Password),
                IsActive = false
            };

            UserService.Create(user);

            person = new Person
            {
                Name = request.Name,
                Surname = request.Surname,
                City = request.Sity,
                Age = request.Age,
                User = user
            };

            PersonService.Create(person);

            var interests = new Interest
            {
                User = user,
                Fishing = request.Interest.Fishing,
                Sport = request.Interest.Sport,
                MakeUp = request.Interest.MakeUp,
                Travel = request.Interest.Travel,
                Manicure = request.Interest.Manicure,
                Cinema = request.Interest.Cinema
            };

            InterestService.Create(interests);

            return Json(new ResponseModel());
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> UserSignIn([FromBody] SignInRequest request)
        {
            var user = UserService.GetAll().FirstOrDefault(x => 
                x.Login == request.Login && 
                x.Password == CreateMD5(request.Password));

            if (user == null)
                return Json(new ResponseModel {
                    Success = false,
                    Message = "Wrong email or password"
                });

            return Json(new ResponseModel
            {
                Success = true,
                Message = user.Login
            });
        }
        [HttpPost("getUserInfo")]
        public async Task<IActionResult> UserInfo([FromBody] string request)
        {
            var user = UserService.GetAll().FirstOrDefault(x =>
                x.Login == request);

            if (user == null)
                return Json(new ResponseModel
                {
                    Success = false,
                    Message = "Wrong email or password"
                });
            var person = PersonService.GetAll().FirstOrDefault(x =>
                x.User == user);

            var interest = InterestService.GetAll().FirstOrDefault(x =>
               x.User == user);


            return Json(new UserInfoResponse
            {
                FIO = person.Name +" "+ person.Surname,
                City = person.City,
                Age = person.Age,
                Fishing = interest.Fishing,
                Sport = interest.Sport,
                MakeUp = interest.MakeUp,
                Travel = interest.Travel,
                Manicure = interest.Manicure,
                Cinema = interest.Cinema
            });
        }
        [HttpGet("getPersent")]
        public async Task<IActionResult> PercentUsers(string login)
        {
            var user = UserService.GetAll().FirstOrDefault(x =>
               x.Login == login);
   
       
            if (user == null)
                return Json(new ResponseModel
                {
                    Success = false,
                    Message = "Wrong email or password"
                });

            var mainInterest = InterestService.Get(user.ID);
            var mainUser = PersonService.Get(user.ID);
            var g = 0;
            var list = new List<PercentInfo>();

            if (mainInterest.Cinema == true)
                g++;
            if (mainInterest.Fishing == true)
                g++;

            if (mainInterest.MakeUp == true)
                g++;

            if (mainInterest.Manicure == true)
                g++;

            if (mainInterest.Sport == true)
                g++;

            if (mainInterest.Travel == true)
                g++;


            var users = UserService.GetAll().Where(x => x.Login != login);
            foreach (var person in users)
            {
                double AllPercent = 0;
                var i = 0;
                var age = 0;
                var city = 0;

                var interests = InterestService.Get(person.ID);
                var userInfo = PersonService.Get(person.ID);

                if (userInfo.City == mainUser.City)
                    city = 25;
                if (userInfo.Age == mainUser.Age)
                    age = 25;
                if (mainInterest.MakeUp == true && interests.MakeUp == true)
                    i++;             
                if (mainInterest.Cinema == true && interests.Cinema == true)
                    i++;
                if (mainInterest.Fishing == true && interests.Fishing == true)
                    i++;
                if (mainInterest.Manicure == true && interests.Manicure == true)
                    i++;
                if (mainInterest.Sport == true && interests.Sport == true)
                    i++;
                if (mainInterest.Travel == true && interests.Travel == true)
                    i++;

                AllPercent = (i * 50)/g + age + city;

                if (AllPercent >= 40)
                {
                    list.Add(new PercentInfo
                    {
                        Login = person.Login,
                        Percent = AllPercent
                    });
                }
            }
            return Json(new PercentResponse { Data = list , Message = login});
        }

     
        [HttpPost("getMe")]
        public async Task<IActionResult> GetMe([FromBody] string request)
        {
            var user = UserService.GetAll().FirstOrDefault(x =>
               x.Login == request);

            var person = PersonService.GetAll().FirstOrDefault(x =>
               x.User == user);
            var interest = InterestService.GetAll().FirstOrDefault(x =>
               x.User == user);
            var posting = PostingService.GetAll().Where(x=>x.Login == user.Login);

            var list = new List<PostViewModel>();

            foreach (var post in posting)
            {
                list.Add(new PostViewModel {
                    Date = post.Date,
                    Time = post.Time,
                    Text = post.Text
                });
            }

            return Json(new GetMeResponse {
                City = person.City,
                Age = person.Age,
                Fishing = interest.Fishing,
                Sport = interest.Sport,
                MakeUp = interest.MakeUp,
                Travel = interest.Travel,
                Manicure = interest.Manicure,
                Cinema = interest.Cinema,
                Data = list
            });
        }

        [HttpPost("changePost")]
        public async Task<IActionResult> ChangePost([FromBody] ChangePostRequest request)
        {
            var user = UserService.GetAll().FirstOrDefault(x =>
               x.Login == request.Login);

            var posting = PostingService.GetAll().FirstOrDefault(x =>
               x.Login == user.Login && x.Time == request.Time_Old && x.Date == request.Date_Old);

            posting.Date = request.Date;
            posting.Time = request.Time;
            posting.Text = request.Text;

            PostingService.Update(posting);

            return Json(new ResponseModel());
        }

        [HttpPost("changeUserInfo")]
        public async Task<IActionResult> ChangeUserInfo([FromBody] ChangeUserRequest request)
        {
            var user = UserService.GetAll().FirstOrDefault(x =>
               x.Login == request.Name);

            var person = PersonService.GetAll().FirstOrDefault(x =>
               x.User == user);

            var interest = InterestService.GetAll().FirstOrDefault(x =>
               x.User == user);


            person.Age = request.Age;
            person.City = request.City;
            PersonService.Update(person);

            interest.Cinema = request.Interests.Cinema;
            interest.Fishing = request.Interests.Fishing;
            interest.MakeUp = request.Interests.MakeUp;
            interest.Manicure = request.Interests.Manicure;
            interest.Sport = request.Interests.Sport;
            interest.Travel = request.Interests.Travel;
            InterestService.Update(interest);



            return Json(new ResponseModel());
        }

        private string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (var md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                var sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                    sb.Append(hashBytes[i].ToString("X2"));

                return sb.ToString();
            }
        }
    }
}
