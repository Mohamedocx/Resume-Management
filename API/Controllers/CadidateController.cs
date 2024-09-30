using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Context;
using API.Core.Dtos.Cadidate;
using API.Core.Entites;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CadidateController : ControllerBase
    {
        private ApplicationDbContext _Context { get; }
        private IMapper _Mapper { get; }

        public CadidateController(ApplicationDbContext context, IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }

        // create

        [HttpPost]
        [Route("CreateCandidate")]

        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile PdfFile)
        {
            // Save pdf to server
            // save url into entity 
            var FiveMegabyte = 5 * 1024 * 1024;
            var PdfMyType = "application/pdf";


            if (PdfFile.Length > FiveMegabyte || PdfFile.ContentType != PdfMyType)
            {
                return BadRequest("File is too large or not pdf");
            }

            var reusmeUr = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Document", "Pdf", reusmeUr);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await PdfFile.CopyToAsync(stream);
            }

            var newCadidate = _Mapper.Map<Candidate>(dto);
            newCadidate.ResumeUrl = reusmeUr;
            await _Context.Candidate.AddAsync(newCadidate);
            await _Context.SaveChangesAsync();
            return Ok("Candidate Created !!");



        }

        // Read

        [HttpGet]
        [Route("GetAllCandidate")]

        public async Task<ActionResult<IEnumerable<CadidateGetDto>>> GetAllCandidate()
        {
            var Cadidates = await _Context.Candidate.Include(Candidate => Candidate.Job).ToListAsync();
            var convertedCadidate = _Mapper.Map<IEnumerable<CadidateGetDto>>(Cadidates);

            return Ok(convertedCadidate);

        }


        // Read Download Pdf File
        [HttpGet]

        [Route("DownloadResume/{url}")]
        public IActionResult DownloadResumes (string url)
        {
         var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Document", "Pdf", url);
         if(!System.IO.File.Exists(filePath)){
            return NotFound("File Not Found");
         }
         
         var pdfBytes = System.IO.File.ReadAllBytes(filePath);
         var pdfName = File(pdfBytes, "application/pdf", url);
         return pdfName;

        }
    }


}