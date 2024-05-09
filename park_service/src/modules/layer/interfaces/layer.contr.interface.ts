export interface ILayerById {
    id: number
}

export interface IUpdateLayerDto{
    name?: string;
    floor?: number;
    parkId?: number; 
}

export interface ILayerUpdateDto {
   id: number;
   data: IUpdateLayerDto;
}