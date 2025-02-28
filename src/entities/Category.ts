import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product"; // Import entity Product nếu có liên kết

@Entity("categories") 
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nameCategory?: string;

    @OneToMany(() => Product, (product) => product.category)
    products?: Product[];
}
export default Category