import { DriverContractStatuses } from "./driverContractStatuses";

export interface Driver 
{
    id: number,
    creationDate: Date | undefined,
    firstName: string,
    lastName: string,
    cnp: string,
    telNumber: string,
    address: string,
    dateOfBirt: string,
    driverLicenceNumber: string,
    driverLicenceExpirationDate: Date | undefined,
    drivingCertificateNumber: string,
    drivingCertificateExpirationDate: Date | undefined,
    contractNumber: string,
    contractStatus: DriverContractStatuses,
    actionsLog: string[]
}