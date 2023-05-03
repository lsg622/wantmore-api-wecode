import { CommonEntity } from 'src/common/entity/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Team extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.team, { cascade: true })
  users: User[];
}
