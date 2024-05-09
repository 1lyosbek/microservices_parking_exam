export interface IUserDetailById {
    id:number;
}

export interface IUserDetailUpdataData {
    firstName:string;
    lastName:string;
    avatar: number;
    user_id: number;
}

export interface IUserDetailUpdate {
    id:number;
    data: IUserDetailUpdataData;
}