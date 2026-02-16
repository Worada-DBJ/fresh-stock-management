import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items') // 'items' คือชื่อตารางในฐานข้อมูล
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity: number;

    @Column()
    category: string;

    @Column()
    location: string;

    @Column({ type: 'date' })
    production_date: Date;

    @Column({ type: 'date' })
    expiry_date: Date;
}