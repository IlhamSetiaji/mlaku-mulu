import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateTourDto } from './dto/create-tour.dto';
import type { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  create(createTourDto: CreateTourDto) {
    return this.prisma.tour.create({
      data: createTourDto,
    });
  }

  findAll() {
    return this.prisma.tour.findMany();
  }

  findOne(id: string) {
    return this.prisma.tour.findUnique({ where: { id } });
  }

  update(id: string, updateTourDto: UpdateTourDto) {
    return this.prisma.tour.update({
      where: { id },
      data: updateTourDto,
    });
  }

  remove(id: string) {
    return this.prisma.tour.delete({ where: { id } });
  }
}