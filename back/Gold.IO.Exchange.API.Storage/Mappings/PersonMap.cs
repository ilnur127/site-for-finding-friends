using FluentNHibernate.Mapping;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;

namespace Ardex.Exchange.API.Storage.Mappings
{
    public class PersonMap : ClassMap<Person>
    {
        public PersonMap()
        {
            Table("persons");

            Id(u => u.ID, "id");

            References(e => e.User, "id_user");
            Map(u => u.Name, "name");
            Map(u => u.Surname, "surname");
            Map(u => u.City, "city");
            Map(u => u.Age, "age");
            Map(u => u.Deleted, "deleted").Not.Nullable();
        }
    }
}
