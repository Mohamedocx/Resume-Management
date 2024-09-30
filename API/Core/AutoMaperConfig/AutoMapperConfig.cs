using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Dtos.Cadidate;
using API.Core.Dtos.Compony;
using API.Core.Dtos.Job;
using API.Core.Entites;
using AutoMapper;

namespace API.Core.AutoMaperConfig
{
    public class AutoMapperConfig :Profile
    {
        public AutoMapperConfig()
        {
            // Company
            CreateMap<CompanyCreateDto , Company>();
            CreateMap<Company,CompanyGetDto>();
            
            //Job

            CreateMap<JobCreatDto,Job>();
            CreateMap<Job,JobGetDto>()
            .ForMember(dest => dest.CompanyName , opt => opt.MapFrom(src => src.company.Name));

            
        // Cadidatr

       CreateMap<CandidateCreateDto,Candidate>();
       CreateMap<Candidate,CadidateGetDto>()
       .ForMember(dest => dest.JobTitle , opt => opt.MapFrom(src => src.Job.Title)); 
       
                
        }
}
}