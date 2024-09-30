using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Enums;

namespace API.Core.Dtos.Job
{
    public class JobCreatDto
    {
          public String Title { get; set; }
        public JobLevel JobLevel { get; set; }

        // Relations    
        public long CompanyId { get; set; }      
    }
}