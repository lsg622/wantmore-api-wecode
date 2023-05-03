import { CommonEntity } from 'src/common/entity/common.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Team, (team) => team.users, { onDelete: 'CASCADE' })
  team: Team;
}
