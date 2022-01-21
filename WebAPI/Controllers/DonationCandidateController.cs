#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationCandidateController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public DonationCandidateController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DonationCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationCandidate>>> GetDonationCandidates()
        {
            return await _context.DonationCandidates.ToListAsync();
        }

        // GET: api/DonationCandidate/5    this is to return a specific record with a given id
        [HttpGet("{id}")]
        public async Task<ActionResult<DonationCandidate>> GetDonationCandidate(int id)
        {
            var donationCandidate = await _context.DonationCandidates.FindAsync(id);

            if (donationCandidate == null)
            {
                return NotFound();
            }

            return donationCandidate;
        }

        // PUT: api/DonationCandidate/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonationCandidate(int id, DonationCandidate donationCandidate)
        {
            donationCandidate.id = id;
            _context.Entry(donationCandidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonationCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DonationCandidate
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DonationCandidate>> PostDonationCandidate(DonationCandidate donationCandidate)
        {
            _context.DonationCandidates.Add(donationCandidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonationCandidate", new { id = donationCandidate.id }, donationCandidate);
        }

        // DELETE: api/DonationCandidate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonationCandidate(int id)
        {
            var donationCandidate = await _context.DonationCandidates.FindAsync(id);
            if (donationCandidate == null)
            {
                return NotFound();
            }

            _context.DonationCandidates.Remove(donationCandidate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DonationCandidateExists(int id)
        {
            return _context.DonationCandidates.Any(e => e.id == id);
        }
    }
}
