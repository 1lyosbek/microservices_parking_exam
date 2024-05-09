import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/database/baseEntity";

@Entity('files')
export class FileEntity extends BaseEntity {
    @Column({name: 'url', type: 'text', nullable: false})
    url: string;
    @Column({name: 'mimetype', type: 'varchar', nullable: false})
    mimetype: string;
    @Column({name: 'size', type: 'integer', nullable: false})
    size: number;
}
