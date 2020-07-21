using System.Linq;
using System.Threading.Tasks;
using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.ViewModels;
using Ardex.Exchange.API.ViewModels.Request;
using Ardex.Exchange.API.ViewModels.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ardex.Exchange.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PersonsController : Controller
    {
        private IUserService UserService { get; set; }
        private IPersonService PersonService { get; set; }


        public PersonsController([FromServices]
            IUserService userService,
            IPersonService personService)
        {
            UserService = userService;
            PersonService = personService;

        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var user = UserService.GetAll().FirstOrDefault(x => x.Login == User.Identity.Name);
            var person = PersonService.GetAll().FirstOrDefault(x => x.User == user);

            return Json(new DataResponse<PersonViewModel> { Data = new PersonViewModel(person) });
        }

    }
}