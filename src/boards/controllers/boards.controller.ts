import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from '../services/boards.service';
import { CreateBoardDto } from '../dtos/create.board.dto';
import { ApiResponse } from 'src/common/response/api.response';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async createBoard(@Body() CreateBoardDto: CreateBoardDto) {
    const createdBoard = await this.boardsService.createBoard(CreateBoardDto);
    return new ApiResponse(HttpStatus.CREATED, createdBoard);
  }

  @Get()
  async findAll() {
    const boards = await this.boardsService.findAll();
    return new ApiResponse(HttpStatus.OK, boards);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(+id);
    return new ApiResponse(HttpStatus.OK, board);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: CreateBoardDto,
  ) {
    const board = await this.boardsService.update(+id, updateBoardDto);
    return new ApiResponse(HttpStatus.OK, board);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    await this.boardsService.deleteBoard(+id);
    return new ApiResponse(HttpStatus.OK, id);
  }
}
