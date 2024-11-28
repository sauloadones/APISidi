import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import User from '../../User/entity/Entities'; 

@Entity('checkin')
class CheckIn {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @CreateDateColumn()
    timestamp!: Date;
}

export default CheckIn;

