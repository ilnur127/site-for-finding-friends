using Ardex.Exchange.API.BusinessLogic.Services;
using Ardex.Exchange.API.Storage.Interfaces;
using Garey.API.BusinessLogic.Interfaces;
using Garey.API.Domain.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace Garey.API.BusinessLogic.Services
{
    public class PostingService : BaseCrudService<Post>, IPostingService
    {
        public PostingService(IRepository<Post> repository) : base(repository)
        {
        }
    }
}
