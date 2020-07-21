using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garey.API.ViewModels.Request
{
    public class ChangePostRequest
    {
        public string Date { get; set; }
        public string Date_Old { get; set; }
        public string Login { get; set; }
        public string Text { get; set; }
        public string Time { get; set; }
        public string Time_Old { get; set; }
    }
}
