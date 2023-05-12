import { Module } from '@nestjs/common';
import { BoardsController } from './controllers/boards.controller';
import { BoardsService } from './services/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
