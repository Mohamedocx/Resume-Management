using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Enums;

namespace API.Core.Dtos.Compony
{
    public class CompanyCreateDto
    {
        public String Name { get; set; }
        public CompanySize Size { get; set; }
    }
}