import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { NoteForSaveDto } from './dtos/noteForSave.dto';
import { NotesService } from './notes.service';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(@Req() req) {
    return await this.notesService.findAll(req.sub);
  }

  @Post()
  async create(@Req() req, @Body() noteForSaveDto: NoteForSaveDto) {
    return await this.notesService.create(req.sub, noteForSaveDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body() noteForSaveDto: NoteForSaveDto,
  ) {
    return await this.notesService.update(id, req.sub, noteForSaveDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return await this.notesService.delete(id, req.sub);
  }
}
