
namespace Ardex.Exchange.API.ViewModels.Response
{
    public class DataResponse<T> : ResponseModel
    {
        public T Data { get; set; }
    }
}
