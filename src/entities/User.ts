import { Entity, PrimaryGeneratedColumn, Table, Column } from "typeorm"

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    fullName?: string

    @Column()
    email?: string

    @Column()
    password?: string

    @Column()
    isActive?: boolean
}