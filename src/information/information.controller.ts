import { InformationService } from './information.service';
import { SaveInformationDto } from './dto/save.dto';
import { throwNotFound } from '../common/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get()
  async findAll() {
    return await this.informationService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const info = await this.informationService.findById(id);
    throwNotFound(info, 'Not found');
    return info;
  }

  @Post()
  async create(inputs: SaveInformationDto) {
    return await this.informationService.create(inputs);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() inputs: SaveInformationDto) {
    const info = await this.informationService.findById(id);
    throwNotFound(info, 'Not found');
    return await this.informationService.update(info, inputs);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const info = this.informationService.findById(id);
    throwNotFound(info, 'Not found');
    return await this.informationService.deleteById(id);
  }
}
