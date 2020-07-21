using FluentNHibernate.Mapping;
using Garey.API.Domain.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace Garey.API.Storage.Mappings
{
    class PostingMap : ClassMap<Post>
    {
        public PostingMap()
        {
            Table("posting");

            Id(u => u.ID, "id");
            Map(u => u.Login, "login");
            Map(u => u.Date, "date");
            Map(u => u.Time, "time");
            Map(u => u.Text, "text");
            Map(u => u.Deleted, "deleted").Not.Nullable();
        }
    }
}
