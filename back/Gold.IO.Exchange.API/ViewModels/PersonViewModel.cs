using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using System;

namespace Ardex.Exchange.API.ViewModels
{
    public class PersonViewModel
    {
        public UserViewModel User { get; set; }

        public long ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public int Age { get; set; }

        // public CityViewModel City { get; set; }
        public string Address { get; set; }

        public PersonViewModel() { }

        public PersonViewModel(Person person)
        {
            if (person != null)
            {
                ID = person.ID;
                Name = person.Name;
                Surname = person.Surname;
                City = person.City;
                Age = person.Age;
                User = new UserViewModel(person.User);
            }
        }

        public static explicit operator PersonViewModel(Person person) => new PersonViewModel(person);
    }
}
