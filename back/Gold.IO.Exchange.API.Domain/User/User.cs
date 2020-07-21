using System;

namespace Ardex.Exchange.API.Domain.User
{
    public class User : PersistentObject, IDeletableObject
    {
        public virtual string Login { get; set; }
        public virtual string Password { get; set; }
        public virtual bool IsActive { get; set; }
        public virtual bool Deleted { get; set; }
    }
}
