using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ardex.Exchange.API.Storage.Mappings
{
    public class InterestMap: ClassMap<Interest>
    {
        public InterestMap()
        {
            Table("interest");

            Id(u => u.ID, "id");
            References(e => e.User, "id_user");
            Map(u => u.Fishing, "fishing");
            Map(u => u.Sport, "sport");
            Map(u => u.MakeUp, "make_up");
            Map(u => u.Travel, "travel");
            Map(u => u.Manicure, "manicure");
            Map(u => u.Cinema, "cinema");
            Map(u => u.Deleted, "deleted").Not.Nullable();
        }
    }
}
