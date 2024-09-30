using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Context;
using API.Core.Dtos.Compony;
using API.Core.Entites;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _Context { get; }
        private IMapper _Mapper { get; }

        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }

        // creat
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            Company newCompany = _Mapper.Map<Company>(dto);
            await _Context.Company.AddAsync(newCompany);
            await _Context.SaveChangesAsync();
            return Ok("Company Created !!");
        }

        //Read 
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetAll()
        {
            var companies = await _Context.Company.ToListAsync();
            var companyDtos = _Mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(companyDtos);
        }
        

    }
}