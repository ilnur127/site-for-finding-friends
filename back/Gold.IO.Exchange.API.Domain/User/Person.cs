using System;

namespace Ardex.Exchange.API.Domain.User
{
    public class Person : PersistentObject, IDeletableObject
    {
        public virtual User User { get; set; }
        public virtual string Name { get; set; }
        public virtual string Surname { get; set; }
        public virtual string City { get; set; }
        public virtual int Age { get; set; }
        public virtual bool Deleted { get; set; }
    }
}
