import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('baterponto')
class baterponto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

   

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

