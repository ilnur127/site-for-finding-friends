using Ardex.Exchange.API.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Garey.API.Domain.User
{
    public class Post : PersistentObject, IDeletableObject
    {
        public virtual string Login { get; set; }
        public virtual string Date { get; set; }
        public virtual string Time { get; set; }
        public virtual string Text { get; set; }
        public virtual bool Deleted { get; set; }
    }
}
