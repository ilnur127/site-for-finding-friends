using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.ViewModels.Request
{
    public class PostingRequest
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string Text { get; set; }
    }
}
