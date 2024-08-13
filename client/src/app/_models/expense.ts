import { Driver } from "./driver"
import { Job } from "./job"
import { Truck } from "./truck"

export interface Expense{
    id: number,
    date: Date,
    value: number,
    name: string,
    client: string,
    supplier: string,
    detail: string,
    paid: boolean
    driverId: number,
    truckId: number,
    jobId: number,
    driver: Driver,
    truck: Truck,
    job: Job,
}