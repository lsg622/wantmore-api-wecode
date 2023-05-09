import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { _name, _email, _password } = createUserDto;

    const user = this.repository.create({
      name: _name,
      email: _email,
      password: _password,
    });

    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const { _name, _email, _password } = updateUserDto;

    const user = await this.repository.findOneBy({ id });
    user.name = _name;
    user.email = _email;
    user.password = _password;
    return this.repository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
