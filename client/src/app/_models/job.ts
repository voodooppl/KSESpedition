import { Driver } from "./driver";
import { Expense } from "./expense";
import { Truck } from "./truck";

export interface Job{
    id: number,
    startDate: Date,
    endDate: Date,
    startPoint: string,
    destination: string,
    transportingFirm: string,
    client: string,
    transportedGoods: string,
    kM: number,
    expenses: Expense[],
    income: number,
    profit: number,
    log: string[],
    details: string,
    drivers: Driver[],
    trucks: Truck[]
}