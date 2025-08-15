import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { QuerySignalDto } from './dto/query-signal.dto';

@Controller('signals')
export class SignalsController {
  constructor(private readonly service: SignalsService) {}

  @Post()
  create(@Body() dto: CreateSignalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() q: QuerySignalDto) {
    return this.service.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSignalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
