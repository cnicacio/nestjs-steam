import { User } from 'src/users/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Entity,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  image: string;

  @Column({ nullable: false, type: 'varchar', length: 500 })
  description: string;

  @Column({ nullable: false, type: 'varchar', length: 500 })
  genre: string;

  @Column({ nullable: false, type: 'number', length: 500 })
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.games)
  @JoinTable()
  users: User[];
}
