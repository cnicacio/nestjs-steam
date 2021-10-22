import { TypeOrmModuleOptions } from '@nestjs/typeorm'; // módulo de configuração do typeORM

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'pgmail',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // acessa todas as pastas do projeto e procura pelas entities
  synchronize: true, // sincroniza automaticamente o Schema com o DB sempre que alterado (sem necessidade de fazer migrations)
};
