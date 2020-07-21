using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using Ardex.Exchange.API.Storage.Interfaces;

namespace Ardex.Exchange.API.BusinessLogic.Services
{
    public class PersonService : BaseCrudService<Person>, IPersonService
    {
        public PersonService(IRepository<Person> repository) : base(repository)
        {
        }
    }
}
