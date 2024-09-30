using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Context;
using API.Core.Dtos.Job;
using API.Core.Entites;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
         private ApplicationDbContext _Context { get; }
        private IMapper _Mapper { get; }

        public JobController(ApplicationDbContext context, IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }

        // creat

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreatDto dto)
        {
            Job newJob = _Mapper.Map<Job>(dto);
            await _Context.Job.AddAsync(newJob);
            await _Context.SaveChangesAsync();
            return Ok("Job Created !!");
        }

        // read`

        [HttpGet]
        [Route("GetAllJobs")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetAllJobs()
        {
            var jobs = await _Context.Job.Include(job =>job.company).ToListAsync();
            var jobDtos = _Mapper.Map<IEnumerable<JobGetDto>>(jobs);

            return Ok(jobDtos);
          }
    }
}