using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using Ardex.Exchange.API.Storage.Interfaces;

namespace Ardex.Exchange.API.BusinessLogic.Services
{
    public class UserService : BaseCrudService<User>, IUserService
    {
        public UserService(IRepository<User> repository) : base(repository)
        {
        }
    }
}
