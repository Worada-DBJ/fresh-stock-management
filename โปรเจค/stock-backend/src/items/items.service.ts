import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Log } from './log.entity'; // [ใหม่!] อย่าลืม import log entity มาด้วย

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        
        @InjectRepository(Log) // [ใหม่!] ฉีด Repository ของ Log เข้ามา
        private logsRepository: Repository<Log>,
    ) { }

    /**
     * C = Create + Data Pipeline (ADD)
     */
    async create(item: Omit<Item, 'id'>): Promise<Item> {
        const newItem = this.itemsRepository.create(item);
        const savedItem = await this.itemsRepository.save(newItem);

        // --- Start Pipeline: บันทึก Log เมื่อมีการเพิ่มของ ---
        await this.logsRepository.save({
            item_id: savedItem.id,
            action_type: 'ADD',
            new_qty: savedItem.quantity,
            // timestamp จะรันอัตโนมัติจาก DB
        });

        return savedItem;
    }

    findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    async findOne(id: number): Promise<Item> {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Item with ID "${id}" not found`);
        }
        return item;
    }

    /**
     * U = Update + Data Pipeline (UPDATE)
     */
    async update(id: number, updateItemDto: Partial<Item>): Promise<Item> {
        const item = await this.findOne(id);
        const oldQty = item.quantity; // เก็บค่าเก่าไว้ทำ Analysis

        Object.assign(item, updateItemDto);
        const updatedItem = await this.itemsRepository.save(item);

        // --- Start Pipeline: บันทึก Log เมื่อมีการแก้ไข ---
        await this.logsRepository.save({
            item_id: id,
            action_type: 'UPDATE',
            old_qty: oldQty,
            new_qty: updatedItem.quantity,
        });

        return updatedItem;
    }

    /**
     * D = Delete + Data Pipeline (DELETE)
     */
    async remove(id: number): Promise<void> {
        // ดึงข้อมูลก่อนลบเพื่อเก็บ Log
        const item = await this.itemsRepository.findOneBy({ id });
        
        const result = await this.itemsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Item with ID "${id}" not found`);
        }

        // --- Start Pipeline: บันทึก Log เมื่อมีการลบ ---
        await this.logsRepository.save({
            item_id: id,
            action_type: 'DELETE',
            old_qty: item ? item.quantity : 0,
            new_qty: 0,
        });
    }
}