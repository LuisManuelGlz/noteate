import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UsersService } from '../users/users.service';
import { NoteForSaveDto } from './dtos';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(owner: Schema.Types.ObjectId) {
    return await this.noteModel.find({ owner }).sort({ createdAt: -1 });
  }

  async create(owner: string, noteForSaveDto: NoteForSaveDto) {
    return await this.noteModel.create({ owner, ...noteForSaveDto });
  }

  async update(noteId: string, owner: Schema.Types.ObjectId, noteForSaveDto: NoteForSaveDto) {
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

  async delete(noteId: string, owner: Schema.Types.ObjectId) {
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
