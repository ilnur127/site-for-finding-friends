using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.ViewModels;
using Ardex.Exchange.API.ViewModels.Response;
using Garey.API.BusinessLogic.Interfaces;
using Garey.API.Domain.User;
using Garey.API.ViewModels.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class PostingController: Controller
    {
        private IPostingService PostingService { get; set; }

        public PostingController([FromServices]
            IPostingService postService)
        {
            PostingService = postService;
        }

        [HttpPost("my-post")]
        public async Task<IActionResult> MyPost([FromBody] PostingRequest request)
        {
            var AddPost = new Post
            {
                Login = request.Login,
                Date = request.Date,
                Time = request.Time,
                Text = request.Text
            };

            PostingService.Create(AddPost);

            return Json(new ResponseModel());
        }
    }
}
