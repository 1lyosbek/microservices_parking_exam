export interface IUserDetailById {
    id:number;
}

export interface IUserDetailUpdataData {
    firstName:string;
    lastName:string;
    avatar: number;
    userId: number;
}

export interface IUserDetailUpdate {
    id:number;
    data: IUserDetailUpdataData;
}