
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProp } from './sharedProp.helper';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity()
class User extends SharedProp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: "https://nhungdieuthuvi.com/wp-content/uploads/2021/08/avartar-vit-vang-psyduck.jpg",
    })
    image: string;

    @Column()
    forgotToken: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role[];

}

export default User;