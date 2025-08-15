import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { QuerySignalDto } from './dto/query-signal.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UpdateSignalDto } from './dto/update-signal.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('signals')
@Controller('signals')
@UseInterceptors(CacheInterceptor)
export class SignalsController {
  constructor(private readonly service: SignalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new signal' })
  @ApiBody({
    description: 'Signal details',
    examples: {
      basic: {
        summary: 'Basic example',
        value: {
          deviceId: '66bb584d4ae73e488c30a072',
          time: 1735683480000,
          dataLength: 3,
          dataVolume: 512,
          maxSpeed: 3,
          avgSpeed: 2,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Signal created successfully' })
  create(@Body() dto: CreateSignalDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all signals with optional filters' })
  @ApiQuery({
    name: 'deviceId',
    required: false,
    example: '66bb584d4ae73e488c30a072',
  })
  @ApiQuery({ name: 'timeFrom', required: false, example: 1735683000000 })
  @ApiQuery({ name: 'timeTo', required: false, example: 1735684000000 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'Signals list retrieved successfully',
  })
  @CacheTTL(15)
  findAll(@Query() q: QuerySignalDto) {
    return this.service.findAll(q);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a signal by ID' })
  @ApiParam({ name: 'id', description: 'Mongo ObjectId of the signal' })
  @ApiResponse({ status: 200, description: 'Signal found' })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  @CacheKey('signals:item')
  @CacheTTL(60)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a signal by ID' })
  @ApiParam({ name: 'id', description: 'Mongo ObjectId of the signal' })
  @ApiBody({
    description: 'Fields to update',
    examples: {
      updateExample: {
        value: { avgSpeed: 4, dataVolume: 600 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Signal updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateSignalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal by ID' })
  @ApiParam({ name: 'id', description: 'Mongo ObjectId of the signal' })
  @ApiResponse({ status: 200, description: 'Signal deleted successfully' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
