using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using Ardex.Exchange.API.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ardex.Exchange.API.BusinessLogic.Services
{
    public class InterestService: BaseCrudService<Interest>, IInterestService
    {
        public InterestService(IRepository<Interest> repository) : base(repository)
        {
        }
    }
}
