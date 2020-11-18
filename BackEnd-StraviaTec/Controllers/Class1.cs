using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;

namespace BackEnd_StraviaTec.Controllers
{
    
    public class Class1
    {
        ReportDocument crystalReport;
        public void adf()
        {
            crystalReport = new ReportDocument();
        }
    }
}