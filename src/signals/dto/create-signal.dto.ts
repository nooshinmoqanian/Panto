import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateSignalDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsInt()
  @Min(0)
  time: number;

  @IsInt()
  @Min(0)
  dataLength: number;

  @IsInt()
  @Min(0)
  dataVolume: number;

  @IsOptional()
  @IsInt()
  maxSpeed?: number;

  @IsOptional()
  @IsInt()
  avgSpeed?: number;
}
