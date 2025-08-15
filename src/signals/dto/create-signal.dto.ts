import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSignalDto {
  @ApiProperty({
    example: '66bb584d4ae73e488c30a072',
    description: 'Device ID (Mongo ObjectId)',
  })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({
    example: 1735683480000,
    description: 'Timestamp of the signal in milliseconds',
  })
  @IsInt()
  @Min(0)
  time: number;

  @ApiProperty({
    example: 3,
    description: 'Number of records in the "data" array',
  })
  @IsInt()
  @Min(0)
  dataLength: number;

  @ApiProperty({
    example: 512,
    description: 'Volume of data in bytes after JSON.stringify',
  })
  @IsInt()
  @Min(0)
  dataVolume: number;

  @ApiProperty({
    example: 3,
    required: false,
    description: 'Maximum calculated speed',
  })
  @IsOptional()
  @IsInt()
  maxSpeed?: number;

  @ApiProperty({
    example: 2,
    required: false,
    description: 'Average calculated speed',
  })
  @IsOptional()
  @IsInt()
  avgSpeed?: number;
}
