using Ardex.Exchange.API.Domain.Enum;
using System;

namespace Ardex.Exchange.API.ViewModels
{
    public class SecurityTokenViewModel
    {
        public string Token { get; set; }
        public UserRole Role { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
