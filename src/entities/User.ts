import { Entity, PrimaryGeneratedColumn, Table, Column,ManyToOne } from "typeorm"
import Role from "./Role"
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

    @ManyToOne(() => Role, (role: Role) => role.user)
    role?: Role;
}
export default User