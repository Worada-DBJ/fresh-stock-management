import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('logs') // ชื่อตารางใน phpMyAdmin ที่คุณเพิ่งสร้าง
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_id: number;

  @Column()
  action_type: string; // 'ADD', 'UPDATE', 'DELETE'

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  old_qty: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  new_qty: number;

  @CreateDateColumn()
  timestamp: Date;
}