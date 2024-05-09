import e from "express";

export interface ITransactionById {
    id: number;
}

export interface ITransactionUpdateData {
     shotCreditId: number;
     shotDebitId: number;
     serviceId: number;
     amount: number;
}

export interface ITransactionUpdateDto {
    id: number;
    data: ITransactionUpdateData;
}