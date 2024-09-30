using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Dtos.Cadidate
{
    public class CadidateGetDto
    {
        public long ID { get; set; }
         public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public String CoverLitter { get; set; }
        public String ResumeUrl { get; set; }

        //relations
        public long JobId { get; set; }
       public string JobTitle { get; set; }
    }
}