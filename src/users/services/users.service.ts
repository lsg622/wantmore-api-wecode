import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, password } = createUserDto;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.repository.create({
      name: name,
      password: hashedPassword,
    });

    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const { name, password } = updateUserDto;

    const user = await this.findOne(id);
    user.name = name;
    user.password = password;
    return this.repository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getUserByname(name: string): Promise<User> {
    try {
      return await this.repository.findOneBy({ name: name });
    } catch (err) {
      throw new HttpException('Cause Error', HttpStatus.BAD_REQUEST);
    }
  }
}
