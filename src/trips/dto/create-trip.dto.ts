import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTripDto {
  constructor(
    startDate: Date,
    endDate: Date,
    destination: string,
    touristId: string,
    tourId?: string,
    status?: string,
    notes?: string
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.destination = destination;
    this.touristId = touristId;
    this.tourId = tourId;
    this.status = status;
    this.notes = notes;
  }

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  destination: string;

  @IsString()
  touristId: string;

  @IsString()
  @IsOptional()
  tourId?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
