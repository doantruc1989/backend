import { SharedProp } from 'src/users/entity/sharedProp.helper';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class SaleRevenue extends SharedProp {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    slug: string;

    @Column('varchar')
    parentId: string;
}
