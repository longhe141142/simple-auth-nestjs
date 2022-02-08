import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseE} from '../base';


@Entity('user', {schema: 'auth_ds'})
export class User extends BaseE {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        nullable: true,
        length: 225,
    })
    userName: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    password: string;

    @Column('int', {
        nullable: true,
    })
    age: number;

    @Column('varchar', {
        length: 100,
    })
    email: string;

    @Column('varchar', {
        nullable: true,
        default: null,
    })
    phone: string;

    @Column('varchar', {
        nullable: true,
        default: null,
    })
    address: string;

    @Column('tinyint', {
        nullable: false,
    })
    isActive: boolean;

    @Column('varchar', {
        length: 45,
        default: '2323',
    })
    identityNumber: string;

    @Column('varchar', {
        length: 45,
        nullable: true,
        default: null,
    })
    socialInsurance: string;

    @Column('varchar', {
        nullable: true,
        default: null,
    })
    avatar: string;


    @BeforeInsert()
    beforeInsert() {
        console.log('Success@!');
    }
}
