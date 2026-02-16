import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity'; 
import { Log } from './log.entity'; // [ใหม่!] Import Log Entity เข้ามา
import { ItemsController } from './items.controller'; 
import { ItemsService } from './items.service'; 

@Module({
  // [ใหม่!] เพิ่ม Log เข้าไปใน Array ของ forFeature เพื่อให้ Repository ใน Service ใช้งานได้
  imports: [TypeOrmModule.forFeature([Item, Log])], 
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule { }