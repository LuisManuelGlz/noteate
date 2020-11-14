import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { NoteForSaveDto } from './dtos';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(owner: string) {
    return await this.noteModel.find({ owner }).sort('desc');
  }

  async create(owner: string, noteForSaveDto: NoteForSaveDto) {
    return await this.noteModel.create({ owner, ...noteForSaveDto });
  }

  async update(noteId: string, owner: string, noteForSaveDto: NoteForSaveDto) {
    if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException("Note wasn't found");
    }

    const noteUpdated = await this.noteModel.findOneAndUpdate(
      { _id: noteId, owner },
      noteForSaveDto,
      { new: true },
    );

    if (!noteUpdated) {
      throw new NotFoundException("Note wasn't found");
    }

    return noteUpdated;
  }

  async delete(noteId: string, owner: string) {
    if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException("Note wasn't found");
    }

    const noteDeleted = await this.noteModel.findOneAndDelete({
      _id: noteId,
      owner,
    });

    if (!noteDeleted) {
      throw new NotFoundException("Note wasn't found");
    }
  }
}
