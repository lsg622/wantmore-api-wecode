import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from 'src/users/dtos/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signInUser(signInDto);
  }
}
