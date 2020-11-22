using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Reflection;
using System.IO;

namespace BackEnd_StraviaTec.Reports
{
    public class GenerateReports
    {

        /// <summary>
        /// Genera el reporte de participantes
        /// </summary>
        public void generateParticipantsReport()
        {
            ReportDocument crystalReport = new ReportDocument();
            string directory = @"C:\Users\Usuario\Desktop\ResportsTest\StraviaTec\BackEnd-StraviaTec";
            string reportDirectory = directory + @"\Reports";
            string savedDirectory = @"C:\Users\Usuario\Desktop\Reports";
            crystalReport.Load(reportDirectory + @"\CrystalReportParticipants.rpt");
            crystalReport.Refresh();
            crystalReport.ExportToDisk(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, savedDirectory + "\\Participants.pdf");
        }

        /// <summary>
        /// Genera el reporte de posiciones por carrera
        /// </summary>
        public void generatePositionsReport()
        {
            ReportDocument crystalReport = new ReportDocument();
            string directory = @"C:\Users\Usuario\Desktop\ResportsTest\StraviaTec\BackEnd-StraviaTec";
            string reportDirectory = directory + @"\Reports";
            string savedDirectory = @"C:\Users\Usuario\Desktop\Reports";
            crystalReport.Load(reportDirectory + @"\CrystalReportPositions.rpt");
            crystalReport.Refresh();
            crystalReport.ExportToDisk(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, savedDirectory + "\\Positions.pdf");
        }
    }
}