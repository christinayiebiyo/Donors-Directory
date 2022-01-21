﻿using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class DonationDBContext : DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options) : base(options)
        {

        }

        public DbSet<DonationCandidate> DonationCandidates { get; set; }
    }
}
