using Ardex.Exchange.API.ViewModels.Response;
using Garey.API.ViewModels.Public;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.ViewModels.Response
{
    public class PercentResponse : ResponseModel
    {
        public List<PercentInfo> Data { get; set; }
    }
}
