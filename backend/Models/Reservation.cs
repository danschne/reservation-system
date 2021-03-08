using System;

namespace backend.Models
{
	public class Reservation
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public DateTime Date { get; set; }
		public int NumberOfPersons { get; set; }
		public Table Table { get; set; }
	}
}
