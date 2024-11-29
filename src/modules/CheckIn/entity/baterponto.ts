import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreatestringColumn } from 'typeorm';
import User from '../../User/entity/Entities'; 

@Entity('baterponto')
class baterponto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column()
    checkInHorario!: string;

    @Column()
    checkOutHorario!: string;

    @Column()
    intervalEntradaHorario!: string;

    @Column()
    checkInData!: string;

    @Column()
    checkOutData!: string;

    @Column()
    intervalEntradaData!: string;

    @Column()
    intervalSaidaData!: string;

    @Column()
    intervalSaidaHorario!: string;
}

export default baterponto;

