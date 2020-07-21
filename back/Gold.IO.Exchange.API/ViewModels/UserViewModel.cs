using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.Enum;
using Ardex.Exchange.API.Domain.User;
using System;

namespace Ardex.Exchange.API.ViewModels
{
    public class UserViewModel
    {
        public long ID { get; set; }
        public string Login { get; set; }
        public DateTime RegistrationDate { get; set; }
        public UserRole Role { get; set; }

        public bool IsActive { get; set; }

        public UserViewModel() { }

        public UserViewModel(User user)
        {
            if (user != null)
            {
                ID = user.ID;
                Login = user.Login;
                IsActive = user.IsActive;
                
            }
        }
    }
}
