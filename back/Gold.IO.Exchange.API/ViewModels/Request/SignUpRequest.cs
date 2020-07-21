using Ardex.Exchange.API.Domain;
using Ardex.Exchange.API.Domain.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ardex.Exchange.API.ViewModels.Request
{
    public class SignUpRequest
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Sity { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public InterestRequest Interest { get; set; }


    }
}
