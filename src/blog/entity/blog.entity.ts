import { SharedProp } from 'src/users/entity/sharedProp.helper';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('blog')
export class Blog extends SharedProp {

    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('longtext')
    title: string;

    @Column('varchar')
    image: string;

    @Column("longtext")
    content: string;

    @Column('longtext')
    littlecontent: string;
}