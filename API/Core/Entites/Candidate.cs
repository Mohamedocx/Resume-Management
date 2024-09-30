using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entitey;

namespace API.Core.Entites
{
    public class Candidate :BaseEntity
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public String CoverLitter { get; set; }
        public String ResumeUrl { get; set; }

        //relations
        public long JobId { get; set; }
        public Job  Job { get; set; }
        
    }
}