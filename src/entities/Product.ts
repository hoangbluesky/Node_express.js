import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 255 })
    name?: string;

    @Column({ type: "varchar", length: 255 })
    image?: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price?: number;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column()
    stock?: number;

    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    category?: Category;
}
export default Product
