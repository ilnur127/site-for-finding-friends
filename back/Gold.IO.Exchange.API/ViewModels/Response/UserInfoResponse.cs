using Ardex.Exchange.API.Domain.User;
using Ardex.Exchange.API.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.ViewModels.Response
{
    public class UserInfoResponse : ResponseModel
    {
        public string FIO { get; set; }
        public string City { get; set; }
        public int Age { get; set; }
        public bool Fishing { get; set; }
        public bool Sport { get; set; }
        public bool MakeUp { get; set; }
        public bool Travel { get; set; }
        public bool Manicure { get; set; }
        public bool Cinema { get; set; }
    }
}
