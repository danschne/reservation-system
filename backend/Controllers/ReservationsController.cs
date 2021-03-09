using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/Reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly Context _context;

        public ReservationsController(Context context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations
                .Include(reservation => reservation.Table)
                .ToListAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(long id)
        {
            var reservation = await _context.Reservations
                .Include(reservation => reservation.Table)
                .FirstOrDefaultAsync(reservation => reservation.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // TODO: validate data from incoming reservation
        [HttpPost]
        public async Task<ActionResult<Reservation>> CreateReservation(Reservation reservation)
        {
            var availableTables = _context.Tables
                .Include(table => table.Reservations)
                .AsEnumerable()
                .Where(table => table.IsAvailableForReservation(reservation))
                .OrderBy(table => table.Capacity - reservation.NumberOfPersons)
                .ToList();

            if (availableTables.Count == 0)
            {
                return NoContent();
            }
            reservation.Table = availableTables.First();
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
        }
    }
}
