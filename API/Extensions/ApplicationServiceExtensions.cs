﻿using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IDriversRepository, DriverRepository>();

        return services;
    }
}
