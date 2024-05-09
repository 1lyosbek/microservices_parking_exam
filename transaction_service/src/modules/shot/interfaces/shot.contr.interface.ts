export interface IShotById {
    id: number;
}

export interface IShotByUserId {
    userId: number;
}

export interface IShotUpdateData {
    userId: number;
    amount: number;
}

export interface IShotUpdateDto {
    id: number;
    data: IShotUpdateData;
}