using System;

namespace backend.Models
{
	public class Reservation
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public DateTime Date { get; set; }
		// JSON: { "date": "2021-03-09T11:23:59.6915848+01:00" }
		public int NumberOfPersons { get; set; }
		public Table Table { get; set; }
	}
}
