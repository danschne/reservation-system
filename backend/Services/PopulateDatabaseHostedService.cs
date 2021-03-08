using System;
using System.Threading;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace backend.Services
{
	public class PopulateDatabaseHostedService : IHostedService
	{
		private readonly IServiceProvider _serviceProvider;

		public PopulateDatabaseHostedService(IServiceProvider serviceProvider)
		{
			_serviceProvider = serviceProvider;
		}

		public async Task StartAsync(CancellationToken cancellationToken)
		{
			using(var scope = _serviceProvider.CreateScope())
			{
				var context = scope.ServiceProvider.GetRequiredService<Context>();

				await addTables(context);
			}
		}

		private async Task addTables(Context context)
		{
			context.Tables.Add(new Table
			{
				Capacity = 2,
			});
			context.Tables.Add(new Table
			{
				Capacity = 12,
			});
			for (var i = 1; i <= 3; i++)
			{
				context.Tables.Add(new Table
				{
					Capacity = 6,
				});
			}
			
			await context.SaveChangesAsync();
		}
		public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
	}
}
