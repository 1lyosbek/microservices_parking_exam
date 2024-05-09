import { ParkEntity } from "../entities/park.entity";

export interface IParkRepository {
    getParks(): Promise<Array<ParkEntity>>;
    getParkById(id: number): Promise<ParkEntity>;
    createPark(entity: ParkEntity): Promise<ParkEntity>;
    updatePark(entity: ParkEntity): Promise<ParkEntity>;
    deletePark(entity: ParkEntity): Promise<ParkEntity>;
}