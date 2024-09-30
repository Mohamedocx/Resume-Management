using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entitey;
using API.Core.Enums;

namespace API.Core.Entites
{
    public class Company :BaseEntity
    {
        public String Name { get; set; }
        public CompanySize Size { get; set; }

    // relations
        public ICollection<Job> Job { get; set; }        
    }
}