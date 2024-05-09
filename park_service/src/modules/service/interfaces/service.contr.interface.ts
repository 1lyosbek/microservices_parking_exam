export interface IServiceById {
    id: number;
}

export interface IUpdateServiceData {
    parkId: number;
    userId: number;
    startedAt: Date;
    endedAt: Date;
    price: number;
    tariffId: number; 
    placeId: number;
}

export interface IUpdateServiceDto {
    id: number;
    data: IUpdateServiceData;
}