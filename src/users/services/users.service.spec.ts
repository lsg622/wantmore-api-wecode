import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('유저가 생성되어야한다.', async () => {
      // 데이터 생성
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      jest.spyOn(repository, 'create').mockReturnValue(createUserDto as User);
      jest.spyOn(repository, 'save').mockResolvedValue(createUserDto as User);

      // 서비스에서 생성
      const result = await service.create(createUserDto);

      // 결과
      expect(result).toEqual(createUserDto);
      expect(repository.create).toBeCalledWith(createUserDto);
      expect(repository.save).toBeCalledWith(createUserDto);
    });
  });
});
