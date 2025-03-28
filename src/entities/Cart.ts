import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 255 })
    nameAccount?: string;

    @Column({ type: "varchar", length: 255 })
    email?: string;

    @Column({ type: "varchar", length: 255 })
    productName?: string;
    
    @Column()
    quantity?: number;

    @Column()
    price?: number;

    @Column({ type: "varchar", length: 255 })
    image?: string;

    @Column()
    isPayment?: boolean

}
export default Cart
