import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcrypt';
import { UserForSignUpDto } from 'src/auth/dtos';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userForSignUpDto: UserForSignUpDto): Promise<UserDocument> {
    const { password1 } = userForSignUpDto;
    const salt = genSaltSync();
    const passwordHash = hashSync(password1, salt);
    return await this.userModel.create({
      ...userForSignUpDto,
      passwordHash,
    });
  }
  
  async findOne(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }
}
