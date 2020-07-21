using FluentNHibernate.Mapping;
using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.Enum;
using Ardex.Exchange.API.Domain.User;

namespace Ardex.Exchange.API.Storage.Mappings
{
    class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("users");

            Id(u => u.ID, "id");

            Map(u => u.Login, "login");
            Map(u => u.Password, "password");
            Map(u => u.IsActive, "is_active");
            Map(u => u.Deleted, "deleted").Not.Nullable();

        }
    }
}
