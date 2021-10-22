import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Unique,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'; // o PrimaryGeneratedColumn gera todos os IDs do DB como UUID
import * as bcrypt from 'bcrypt';
import { Game } from 'src/games/games.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  // cargo - é admin ou usuário normal?
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  // status padrão de todos é verdadeiro, mas pode ser alterado em caso de inativação de conta
  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  // número de vezes que o hash rodará para ser gerado
  @Column({ nullable: false })
  salt: string;

  // baseado no hash, gerará um token de confirmação para cada envio de e-mail. Será enviado em cada solicitação de recuperação de senha!!
  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoveryToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Game, (game) => game.users)
  @JoinTable({ name: 'db_user_games' })
  games: Game[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash == this.password; // compara o hash do password passado pelo usuário com o password que está salvo no banco de dados
  }
}
