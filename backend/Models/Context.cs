using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
	public class Context : DbContext
	{
		public DbSet<Reservation> Reservations { get; set; }
		public DbSet<Table> Tables { get; set; }
		public Context(DbContextOptions<Context> options)
			: base(options)
		{
		}
	}
}
