using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Helpers
{
	public class ValidateDateRange : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			var date = (DateTime) value;

			if (date >= DateTime.Today && date <= DateTime.Today.AddYears(1))
			{
				return ValidationResult.Success;
			}

			return new ValidationResult("Date must be in the range from today to one year from today.");
		}
	}
}
