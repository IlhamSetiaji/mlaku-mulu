import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';
import { Role, Roles } from '../common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator.ts';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { SerializeResponse } from '../common/decorators/serialize-response.decorator.ts';
import { RolesGuard } from '../auth/guards/roles.guard.ts';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @SerializeResponse('simple')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @SerializeResponse('simple')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @SerializeResponse('simple')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @SerializeResponse('simple')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}