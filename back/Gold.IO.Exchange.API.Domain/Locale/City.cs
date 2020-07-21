
namespace Ardex.Exchange.API.Domain.Locale
{
    public class City : PersistentObject, IDeletableObject
    {
        public virtual string Name { get; set; }
        public virtual bool Deleted { get; set; }
    }
}
