import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';

@Injectable()
export class TouristsService {
  constructor(private prisma: PrismaService) {}

  create(createTouristDto: CreateTouristDto) {
    return this.prisma.tourist.create({
      data: createTouristDto,
    });
  }

  findAll() {
    return this.prisma.tourist.findMany();
  }

  async findOne(id: string) {
    const tourist = await this.prisma.tourist.findUnique({
      where: { id },
      include: { trips: true, user: true },
    });
    if (!tourist) {
      throw new NotFoundException(`Tourist with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = tourist.user;
    return {
      ...tourist,
      user: userWithoutPassword,
    };
  }

  findByUserId(userId: string) {
    return this.prisma.tourist.findUnique({
      where: { userId },
      include: { trips: true },
    });
  }

  update(id: string, updateTouristDto: UpdateTouristDto) {
    return this.prisma.tourist.update({
      where: { id },
      data: updateTouristDto,
    });
  }

  remove(id: string) {
    return this.prisma.tourist.delete({ where: { id } });
  }
}