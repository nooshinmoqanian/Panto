import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySignalDto {
  @ApiPropertyOptional({
    example: '66bb584d4ae73e488c30a072',
    description: 'Filter by device ID',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({
    example: 1735683000000,
    description: 'Filter from timestamp (ms)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  timeFrom?: number;

  @ApiPropertyOptional({
    example: 1735684000000,
    description: 'Filter to timestamp (ms)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  timeTo?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Page number for pagination',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 20,
    description: 'Items per page for pagination',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
