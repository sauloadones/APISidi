import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import IUser from '../../interfaces/IUserEntity';



@Entity('users')
export default class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column({ unique: true})
    email!: string

    @Column()
    password!: string

    @CreateDateColumn({ type: 'datetime' })
    createdAt!: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt!: Date | null;


}