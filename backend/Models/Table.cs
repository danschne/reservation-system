using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace backend.Models
{
	public class Table
	{
		public long Id { get; set; }
		
		public int Capacity { get; set; }

		[JsonIgnore]
		public ICollection<Reservation> Reservations { get; set; }

		public bool IsAvailableForReservation(Reservation reservation)
		{
			if (Capacity < reservation.NumberOfPersons)
			{
				return false;
			}

			var existingReservation = Reservations
				?.FirstOrDefault(res => res.Date.Date == reservation.Date.Date);

			return existingReservation == null;
		}
	}
}
