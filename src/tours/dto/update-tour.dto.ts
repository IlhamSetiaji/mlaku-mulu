import { IsNumber, IsString } from "class-validator";

export class UpdateTourDto {
  constructor(
    name: string,
    description: string,
    price: number,
    duration: number,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.duration = duration;
  }

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;
}