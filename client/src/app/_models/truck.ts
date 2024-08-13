import { Job } from "./job";
import { Driver } from "./driver";
import { Expense } from "./expense";
import { TruckStatuses } from "./truckStatuses";
import { FuelTypes } from "./fuelTypes";

export interface Truck{
    id: number,
    vin: string,
    licenceNumber: string,
    manufacturer: string,
    model: string,
    engineCapacity: number,
    horsePower: number,
    fuelType: FuelTypes,
    kmOnBoard: number,
    fabricationDate: Date,
    status: TruckStatuses,
    owner: string,
    itpExpirationDate: Date,
    insurranceExpirationDate: Date,
    roVignetteExpirationDate: Date,
    germanVignetterExpirationDate: Date,
    nextRevisionDate: Date,
    expenses: Expense[],
    log: string[],
    details: string,
    driver: Driver[],
    job: Job,
    jobId: number
}