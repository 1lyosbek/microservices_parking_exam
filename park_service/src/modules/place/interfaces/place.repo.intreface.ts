import { PlaceEntity } from "../entities/place.entity";

export interface IPlaceRepository {
    getPlaces(): Promise<PlaceEntity[]>;
    getPlaceById(id: number): Promise<PlaceEntity>;
    createPlace(entity: PlaceEntity): Promise<PlaceEntity>;
    updatePlace(entity: PlaceEntity): Promise<PlaceEntity>;
    deletePlace(entity: PlaceEntity): Promise<PlaceEntity>;
}