using System;
using System.ComponentModel.DataAnnotations;
using backend.Helpers;

namespace backend.Models
{
	public class Reservation
	{
		public long Id { get; set; }

		[Required]
		public string Name { get; set; }

		[ValidateDateRange]
		public DateTime Date { get; set; }
		// JSON format: { "date": "2021-03-09T11:23:59.6915848+01:00" }

		[Range(1, 12)]
		public int NumberOfPersons { get; set; }

		public Table Table { get; set; }
	}
}
