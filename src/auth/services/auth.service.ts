import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from 'src/users/dtos/create.user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signInUser(user: SignInDto) {
    const userInfo: User | undefined = await this.usersService.getUserByname(
      user.name,
    );

    const pwCheck = await bcrypt.compare(user.password, userInfo.password);

    if (!userInfo || !pwCheck) {
      throw new HttpException('UNAVAILABLE_USER', HttpStatus.BAD_REQUEST);
    }
  }
}
