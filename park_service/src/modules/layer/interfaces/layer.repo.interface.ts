import { LayerEntity } from "../entities/layer.entity";

export interface ILayerRepository {
    getLayers(): Promise<Array<LayerEntity>>;
    getLayerById(id: number): Promise<LayerEntity>;
    createLayer(entity: LayerEntity): Promise<LayerEntity>;
    updateLayer(entity: LayerEntity): Promise<LayerEntity>;
    deleteLayer(entity: LayerEntity): Promise<LayerEntity>;
}