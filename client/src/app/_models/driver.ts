import { DriverContractStatuses } from "./driverContractStatuses";
import { Expense } from "./expense";
import { Job } from "./job";
import { Truck } from "./truck";

export interface Driver 
{
    id: number,
    creationDate: Date,
    firstName: string,
    lastName: string,
    cnp: string,
    telNumber: string,
    employer: string,
    address: string,
    dateOfBirt: string,
    idNumber: string,
    idNumberExpirationDate: Date,
    driverLicenceNumber: string,
    driverLicenceExpirationDate: Date,
    contractNumber: string,
    contractStatus: DriverContractStatuses,
    expenses: Expense[],
    log: string[],
    details: string,
    truckId: number,
    truck: Truck,
    jobId: number,
    job: Job
}