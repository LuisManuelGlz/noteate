import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { NoteForSaveDto } from './dtos/noteForSave.dto';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  @Get()
  async findAll() {
    return 'all';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return id;
  }

  @Post()
  async create(@Body() noteForSaveDto: NoteForSaveDto) {
    return { ...noteForSaveDto };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() noteForSaveDto: NoteForSaveDto,
  ) {
    return { id, ...noteForSaveDto };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return id;
  }
}
