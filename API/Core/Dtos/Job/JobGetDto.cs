using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Enums;

namespace API.Core.Dtos.Job
{
    public class JobGetDto
    {
         public long ID { get; set; }
         public String Title { get; set; }
   
        public long CompanyId { get; set; }        
        public JobLevel JobLevel { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Relations    
        
        
    }
}