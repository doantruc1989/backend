import { SharedProp } from 'src/users/entity/sharedProp.helper';
import {
	Column,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class OrderItem extends SharedProp {
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
	id: string;

	@Column({ type: 'bigint' })
	userId: number;

	@Column("longtext")
	orderItems: string;

	@Column('float', { name: 'cartTotal', precision: 12, default: () => "'0'" })
	cartTotal: number;

	@Column('float', { name: 'revenue', precision: 12, default: () => "'0'" })
	revenue: number;
}
