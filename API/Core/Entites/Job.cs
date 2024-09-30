using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entitey;
using API.Core.Enums;

namespace API.Core.Entites
{
    public class Job :BaseEntity
    {
        public String Title { get; set; }
        public JobLevel JobLevel { get; set; }

        // Relations    
        public long CompanyId { get; set; }        
        public Company company { get; set; }
        public ICollection<Candidate> Candidate { get; set; }
    }
}