import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { getName, getEmail, getPassword } = createUserDto;

    const user = this.repository.create({
      name: getName(),
      email: getEmail(),
      password: getPassword(),
    });

    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findById(id);
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const { getName, getEmail, getPassword } = updateUserDto;

    const user = await this.repository.findById(id);
    user.name = getName();
    user.email = getEmail();
    user.password = getPassword();
    return this.repository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
