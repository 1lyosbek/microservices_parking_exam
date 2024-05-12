export interface ITariffById {
    id: number;
}

export interface IUpadateTariffData {
    name: string;
    parkId: number;
    price: number;
    time: number;
}

export interface IUpdateTariffDto {
    id: number;
    data: IUpadateTariffData;
} 
