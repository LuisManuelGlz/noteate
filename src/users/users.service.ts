import { Injectable } from '@nestjs/common';
import { User } from './interfaces';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: '1',
        email: 'john@mail.com',
        password: 'changeme',
      },
      {
        userId: '2',
        email: 'chris@mail.com',
        password: 'secret',
      },
      {
        userId: '3',
        email: 'maria@mail.com',
        password: 'guess',
      },
    ];
  }

  async findOne(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}
