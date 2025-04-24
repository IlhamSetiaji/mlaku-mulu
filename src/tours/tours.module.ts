import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { PrismaService } from '../prisma/prisma.service';
import { ToursController } from './tours.controller';

@Module({
  controllers: [ToursController],
  providers: [ToursService, PrismaService],
  exports: [ToursService],
})
export class ToursModule {}