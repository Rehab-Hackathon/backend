import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Reaction {
    @PrimaryColumn()
    id: string

    @Column()
    postId: string

    @Column()
    address: string

    @Column()
    reaction: string
}