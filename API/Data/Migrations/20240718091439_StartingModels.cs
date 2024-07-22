using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class StartingModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    CNP = table.Column<string>(type: "TEXT", nullable: false),
                    TelNumber = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirt = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    DriverLicenceNumber = table.Column<string>(type: "TEXT", nullable: true),
                    DriverLicenceExpirationDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    DrivingCertificateNumber = table.Column<string>(type: "TEXT", nullable: true),
                    DrivingCertificateExpirationDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    ContractNumber = table.Column<string>(type: "TEXT", nullable: true),
                    ContractStatus = table.Column<int>(type: "INTEGER", nullable: false),
                    ActionsLog = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trucks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VIN = table.Column<string>(type: "TEXT", nullable: true),
                    LicenceNumber = table.Column<string>(type: "TEXT", nullable: false),
                    Manufacturer = table.Column<string>(type: "TEXT", nullable: true),
                    Model = table.Column<string>(type: "TEXT", nullable: true),
                    EngineCapacity = table.Column<int>(type: "INTEGER", nullable: false),
                    HorsePower = table.Column<int>(type: "INTEGER", nullable: false),
                    FabricationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    ITPExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    InsurranceExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    RoVignetteExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GermanVignetteExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    AssignedDriverId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trucks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trucks_Drivers_AssignedDriverId",
                        column: x => x.AssignedDriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_AssignedDriverId",
                table: "Trucks",
                column: "AssignedDriverId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trucks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Drivers");
        }
    }
}
