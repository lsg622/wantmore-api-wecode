import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dtos/create.board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private repository: Repository<Board>) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { category, title, content, user_id } = createBoardDto;

    const board = this.repository.create({
      category: category,
      title: title,
      content: content,
      user_id: user_id,
    });

    return await this.repository.save(board);
  }

  async findAll(): Promise<Board[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Board> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateBoardDto: CreateBoardDto): Promise<Board> {
    const { category, title, content, user_id } = updateBoardDto;

    const board = await this.findOne(id);
    board.category = category;
    board.title = title;
    board.content = content;
    board.user_id = user_id;
    return this.repository.save(board);
  }

  async deleteBoard(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
