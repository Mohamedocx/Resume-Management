using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entites;
using Microsoft.EntityFrameworkCore;

namespace API.Core.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Company { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<Candidate> Candidate { get; set; }
        public object Companies { get; internal set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Job>()
            .HasOne(job => job.company)
            .WithMany(componay => componay.Job)
            .HasForeignKey(job => job.CompanyId);

            modelBuilder.Entity<Candidate>()
            .HasOne(Candidate => Candidate.Job)
            .WithMany(Job => Job.Candidate)
            .HasForeignKey(Candidate => Candidate.JobId);

            modelBuilder.Entity<Company>()
            .Property(Company =>Company.Size)
            .HasConversion<string>();

              modelBuilder.Entity<Job>()
            .Property(Job => Job.JobLevel)
            .HasConversion<string>();
        }
    }
}