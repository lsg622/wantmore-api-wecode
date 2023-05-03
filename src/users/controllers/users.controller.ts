import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { ApiResponse } from 'src/common/config/api.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.usersService.create(createUserDto);
    return new ApiResponse(HttpStatus.CREATED, createdUser);
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return new ApiResponse(HttpStatus.OK, users);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    return new ApiResponse(HttpStatus.OK, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const user = this.usersService.update(+id, updateUserDto);
    return new ApiResponse(HttpStatus.OK, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
    return new ApiResponse(HttpStatus.OK, id);
  }
}
