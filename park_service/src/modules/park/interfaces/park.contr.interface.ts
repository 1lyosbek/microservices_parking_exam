export interface IParkById {
    id: number
}

export interface IUpdateParkDto{
    name: string;
    owner: number;
    image: number; 
}

export interface IParkUpdateDto {
   id: number;
   data: IUpdateParkDto;
}