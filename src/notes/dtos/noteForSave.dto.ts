import { IsNotEmpty } from 'class-validator';

export class NoteForSaveDto {
  @IsNotEmpty({ message: 'Please write a title' })
  title: string;

  @IsNotEmpty({ message: 'Please write a content' })
  content: string;
}
