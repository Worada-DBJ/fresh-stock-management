import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items') // กำหนด URL หลักของ Controller นี้เป็น /items [cite: 884]
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    // POST /items - สำหรับสร้างข้อมูลใหม่ [cite: 895]
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() newItem: Omit<Item, 'id'>): Promise<Item> {
        return this.itemsService.create(newItem);
    }

    // GET /items - สำหรับดึงข้อมูลทั้งหมด [cite: 887]
    @Get()
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    // GET /items/:id - สำหรับดึงข้อมูลชิ้นเดียว [cite: 891]
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.itemsService.findOne(id);
    }

    // PUT /items/:id - สำหรับอัปเดตข้อมูล [cite: 899]
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateItemDto: Partial<Item>,
    ): Promise<Item> {
        return this.itemsService.update(id, updateItemDto);
    }

    // DELETE /items/:id - สำหรับลบข้อมูล [cite: 903]
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // ตอบกลับ status 204 เมื่อลบสำเร็จ
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.itemsService.remove(id);
    }
}