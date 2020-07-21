using Microsoft.Extensions.DependencyInjection;
using Ardex.Exchange.API.BusinessLogic.Interfaces;
using Ardex.Exchange.API.BusinessLogic.Services;
using Garey.API.BusinessLogic.Interfaces;
using Garey.API.BusinessLogic.Services;

namespace Ardex.Exchange.API.BusinessLogic
{
    public static class Installer
    {
        public static void AddBuisnessServices(this IServiceCollection container)
        {
            container
                .AddScoped<IUserService, UserService>()
                .AddScoped<IPersonService, PersonService>()
                .AddScoped<IInterestService, InterestService>()
                .AddScoped<IPostingService, PostingService>();
        }
    }
}
