import { ShotEntity } from "../entities/shot.entity";

export interface IShotRepository {
    getShots(): Promise<ShotEntity[]>;
    getShotById(id: number): Promise<ShotEntity>;
    getShotByUserId(userId: number): Promise<ShotEntity>;
    createShot(entity: ShotEntity): Promise<ShotEntity>;
    updateShot(entity: ShotEntity): Promise<ShotEntity>;
    deleteShot(entity: ShotEntity): Promise<ShotEntity>;
}