import {
  IsDate,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsIP()
  ip: string;

  genres?: number[];

  @IsNotEmpty()
  director?;

  @IsDate()
  year: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  limit?: number;

  @IsObject()
  user: any;
}
