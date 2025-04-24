import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TripsService } from "./trips.service";
import { Role, Roles } from "../common/decorators/role.decorator";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { AuthGuard } from "@nestjs/passport";
import { SerializeResponse } from "../common/decorators/serialize-response.decorator";

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'trips',
  version: '1',
})
export class TripsController {
  constructor(private readonly tripsService: TripsService) {
    this.tripsService = tripsService;
  }

  @Post()
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Get('tourist/:touristId')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  findByTouristId(@Param('touristId') touristId: string) {
    return this.tripsService.findByTouristId(touristId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @SerializeResponse('simple')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}