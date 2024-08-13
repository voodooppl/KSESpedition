using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDriverTruckJobandExpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trucks_Drivers_AssignedDriverId",
                table: "Trucks");

            migrationBuilder.DropIndex(
                name: "IX_Trucks_AssignedDriverId",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "AssignedDriverId",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "DrivingCertificateExpirationDate",
                table: "Drivers");

            migrationBuilder.RenameColumn(
                name: "DrivingCertificateNumber",
                table: "Drivers",
                newName: "Employer");

            migrationBuilder.AlterColumn<string>(
                name: "VIN",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "RoVignetteExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Model",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Manufacturer",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "InsurranceExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "ITPExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "GermanVignetteExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Trucks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FuelType",
                table: "Trucks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "Trucks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KmOnBoard",
                table: "Trucks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateOnly>(
                name: "NextRevisionDate",
                table: "Trucks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                table: "Trucks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TruckLogs",
                table: "Trucks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TruckId",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Job",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    StartPoint = table.Column<string>(type: "TEXT", nullable: true),
                    Destination = table.Column<string>(type: "TEXT", nullable: true),
                    MyProperty = table.Column<string>(type: "TEXT", nullable: true),
                    Client = table.Column<string>(type: "TEXT", nullable: true),
                    TransportedGoods = table.Column<string>(type: "TEXT", nullable: true),
                    KM = table.Column<int>(type: "INTEGER", nullable: false),
                    Income = table.Column<int>(type: "INTEGER", nullable: false),
                    Profit = table.Column<int>(type: "INTEGER", nullable: false),
                    JobLogs = table.Column<string>(type: "TEXT", nullable: true),
                    Details = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Job", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Value = table.Column<int>(type: "INTEGER", nullable: false),
                    Detail = table.Column<string>(type: "TEXT", nullable: true),
                    Paid = table.Column<bool>(type: "INTEGER", nullable: false),
                    DriverId = table.Column<int>(type: "INTEGER", nullable: false),
                    TruckId = table.Column<int>(type: "INTEGER", nullable: false),
                    JobId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Expenses_Job_JobId",
                        column: x => x.JobId,
                        principalTable: "Job",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Expenses_Trucks_TruckId",
                        column: x => x.TruckId,
                        principalTable: "Trucks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_JobId",
                table: "Trucks",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_JobId",
                table: "Drivers",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_TruckId",
                table: "Drivers",
                column: "TruckId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_DriverId",
                table: "Expenses",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_JobId",
                table: "Expenses",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_TruckId",
                table: "Expenses",
                column: "TruckId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Job_JobId",
                table: "Drivers",
                column: "JobId",
                principalTable: "Job",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Trucks_TruckId",
                table: "Drivers",
                column: "TruckId",
                principalTable: "Trucks",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Trucks_Job_JobId",
                table: "Trucks",
                column: "JobId",
                principalTable: "Job",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Job_JobId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Trucks_TruckId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Trucks_Job_JobId",
                table: "Trucks");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Job");

            migrationBuilder.DropIndex(
                name: "IX_Trucks_JobId",
                table: "Trucks");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_JobId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_TruckId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "FuelType",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "KmOnBoard",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "NextRevisionDate",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "Owner",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "TruckLogs",
                table: "Trucks");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TruckId",
                table: "Drivers");

            migrationBuilder.RenameColumn(
                name: "Employer",
                table: "Drivers",
                newName: "DrivingCertificateNumber");

            migrationBuilder.AlterColumn<string>(
                name: "VIN",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateTime>(
                name: "RoVignetteExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Model",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Manufacturer",
                table: "Trucks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateTime>(
                name: "InsurranceExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ITPExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "GermanVignetteExpirationDate",
                table: "Trucks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AssignedDriverId",
                table: "Trucks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "DrivingCertificateExpirationDate",
                table: "Drivers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_AssignedDriverId",
                table: "Trucks",
                column: "AssignedDriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trucks_Drivers_AssignedDriverId",
                table: "Trucks",
                column: "AssignedDriverId",
                principalTable: "Drivers",
                principalColumn: "Id");
        }
    }
}
