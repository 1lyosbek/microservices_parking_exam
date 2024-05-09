import { TariffEntity } from "../entities/tariff.entity";

export interface ITariffRepository {
    getTariffs(): Promise<TariffEntity[]>;
    getTariffById(id: number): Promise<TariffEntity>;
    createTariff(entity: TariffEntity): Promise<TariffEntity>;
    updateTariff(entity: TariffEntity): Promise<TariffEntity>;
    deleteTariff(entity: TariffEntity): Promise<TariffEntity>;
}