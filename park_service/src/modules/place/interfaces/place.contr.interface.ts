export interface IPlaceById {
    id: number;
}


export interface IUpdateDto {
    name? : string;
    layerId?: number;
    price?: number;
}
export interface IPlaceUpdatedDto {
    id: number;
    data: IUpdateDto;
}