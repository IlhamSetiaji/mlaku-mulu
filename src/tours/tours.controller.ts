import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role, Roles } from "../common/decorators/role.decorator";
import { CreateTourDto } from "./dto/create-tour.dto";
import { ToursService } from "./tours.service";
import { UpdateTourDto } from "./dto/update-tour.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/roles.guard";
import { SerializeResponse } from "../common/decorators/serialize-response.decorator";


@ApiTags('tours')
@ApiBearerAuth()
@Controller({
  path: 'tours',
  version: '1',
})
export class ToursController {
  constructor(private readonly toursService: ToursService) {
    this.toursService = toursService;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  @SerializeResponse('simple')
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}