import { UserTariffEntity } from "../entities/user-tariff.entity";

export interface IUserTariffRepository {
    getUserTariffById(id: number): Promise<UserTariffEntity>;
    getUserTariffs(): Promise<UserTariffEntity[]>;
    createUserTariff(entity: UserTariffEntity): Promise<UserTariffEntity>;
    updateUserTariff(entity: UserTariffEntity): Promise<UserTariffEntity>;
    deleteUserTariff(entity: UserTariffEntity): Promise<UserTariffEntity>;
}