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

    @Column('float', { name: 'sale', precision: 12, default: () => "'0'" })
    sale: number;

    @Column('float', { name: 'revenue', precision: 12, default: () => "'0'" })
    revenue: number;
}
