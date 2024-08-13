using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedtheLognameforallentities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TruckLogs",
                table: "Trucks",
                newName: "Log");

            migrationBuilder.RenameColumn(
                name: "JobLogs",
                table: "Job",
                newName: "Log");

            migrationBuilder.RenameColumn(
                name: "ActionsLog",
                table: "Drivers",
                newName: "Log");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Log",
                table: "Trucks",
                newName: "TruckLogs");

            migrationBuilder.RenameColumn(
                name: "Log",
                table: "Job",
                newName: "JobLogs");

            migrationBuilder.RenameColumn(
                name: "Log",
                table: "Drivers",
                newName: "ActionsLog");
        }
    }
}
