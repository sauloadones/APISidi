import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity('baterponto')
class Baterponto {
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

export default Baterponto;

