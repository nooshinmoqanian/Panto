import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QuerySignalDto {
  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  timeFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  timeTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
