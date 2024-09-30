using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Enums;

namespace API.Core.Dtos.Compony
{
    public class CompanyGetDto
    {
        
        public long ID { get; set; }
         public String Name { get; set; }
        public CompanySize Size { get; set; }
           public DateTime CreatedAt { get; set; }  = DateTime.Now;

    }
}