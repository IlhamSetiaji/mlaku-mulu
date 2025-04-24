import { Module } from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TouristsController],
  providers: [TouristsService, PrismaService],
  exports: [TouristsService],
})
export class TouristsModule {}