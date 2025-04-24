import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateTripDto } from './dto/update-trip.dto';
import type { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    let tour = null;
    const data = { ...createTripDto };
  
    if (typeof data.startDate === 'string') {
      data.startDate = new Date(data.startDate);
    }
  
    if (createTripDto.tourId !== null && createTripDto.tourId !== undefined) {
      tour = await this.prisma.tour.findUnique({ where: { id: createTripDto.tourId } });
      if (!tour) {
        throw new Error('Tour not found');
      }
  
      const endDate = new Date(data.startDate);
      endDate.setDate(endDate.getDate() + tour.duration);
      data.endDate = endDate;
    }
  
    return this.prisma.trip.create({
      data: data,
    });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { tourist: true, tour: true },
    });
  }

  findOne(id: string) {
    return this.prisma.trip.findUnique({
      where: { id },
      include: { tourist: true, tour: true },
    });
  }

  findByTouristId(touristId: string) {
    return this.prisma.trip.findMany({
      where: { touristId },
      include: { tour: true },
      orderBy: { startDate: 'asc' },
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    let tour = null;
    const data = { ...updateTripDto };
  
    if (typeof data.startDate === 'string') {
      data.startDate = new Date(data.startDate);
    }
  
    if (updateTripDto.tourId !== null && updateTripDto.tourId !== undefined) {
      tour = await this.prisma.tour.findUnique({ where: { id: updateTripDto.tourId } });
      if (!tour) {
        throw new Error('Tour not found');
      }
  
      const endDate = new Date(data.startDate);
      endDate.setDate(endDate.getDate() + tour.duration);
      data.endDate = endDate;
    }
  
    return this.prisma.trip.update({
      where: { id },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.trip.delete({ where: { id } });
  }
}