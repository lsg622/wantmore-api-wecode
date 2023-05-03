import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id },
    };
    const user = await this.findOne(options);
    return user;
  }
}
