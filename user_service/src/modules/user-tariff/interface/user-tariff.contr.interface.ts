export interface IUserTariffById {
    id: number;
}

export interface IUpdateUserTariffData {
    userId: number;
    tariffId: number;
    startedAt: Date;
    endedAt: Date;
}

export interface IUpdateUserTariffDto {
    id: number;
    data: IUpdateUserTariffData;
}