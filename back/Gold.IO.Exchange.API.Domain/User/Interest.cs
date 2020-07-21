using System;
using System.Collections.Generic;
using System.Text;

namespace Ardex.Exchange.API.Domain.User
{
    public class Interest : PersistentObject, IDeletableObject
    {
        public virtual User User  { get; set; }
        public virtual bool Fishing { get; set; }
        public virtual bool Sport { get; set; }
        public virtual bool MakeUp { get; set; }
        public virtual bool Travel { get; set; }
        public virtual bool Manicure { get; set; }
        public virtual bool Cinema { get; set; }
        public virtual bool Deleted { get; set; }
    }
}
