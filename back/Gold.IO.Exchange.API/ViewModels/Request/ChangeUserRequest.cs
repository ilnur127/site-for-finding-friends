using Ardex.Exchange.API.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.ViewModels.Request
{
    public class ChangeUserRequest
    {
        public string Name { get; set; }
        public string City { get; set; }
        public int Age { get; set; }
        public Interest Interests { get; set; }
    }
}
