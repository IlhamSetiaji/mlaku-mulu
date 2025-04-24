import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TouristsService } from './tourists.service';
import type { Request } from 'express';
import { CreateTouristDto } from './dto/create-tourist.dto.ts';
import { UpdateTouristDto } from './dto/update-tourist.dto.ts';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../common/decorators/role.decorator.ts';
import type { TouristFilterDto } from './dto/filter-tourist.dto.ts';
import { User } from '../common/decorators/user.decorator.ts';
import { AuthGuard } from '@nestjs/passport';
import { SerializeResponse } from '../common/decorators/serialize-response.decorator.ts';
import { RolesGuard } from '../auth/guards/roles.guard.ts';

@ApiTags('tourists')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'tourists',
  version: '1',
})
export class TouristsController {
  constructor(private readonly touristsService: TouristsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  create(@Body() createTouristDto: CreateTouristDto) {
    return this.touristsService.create(createTouristDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findAll(@Query() filter: TouristFilterDto) {
    return this.touristsService.findAll();
  }

  @Get('me')
  @Roles(Role.TOURIST)
  @SerializeResponse('simple')
  findMe(@User() user: { id: string }) {
    const userId = user.id;
    console.log('User ID from request:', userId);
    return this.touristsService.findByUserId(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findOne(@Param('id') id: string) {
    return this.touristsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  update(@Param('id') id: string, @Body() updateTouristDto: UpdateTouristDto) {
    return this.touristsService.update(id, updateTouristDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @SerializeResponse('simple')
  remove(@Param('id') id: string) {
    return this.touristsService.remove(id);
  }
}