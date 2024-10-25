import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { Client } from './client/models/client.model';
import { DirectionsModule } from './directions/directions.module';
import { Direction } from './directions/models/direction.model';
import { DirectionTypesModule } from './direction_types/direction_types.module';
import { DirectionType } from './direction_types/models/direction_type.model';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { ClinicModule } from './clinic/clinic.module';
import { Clinic } from './clinic/models/clinic.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASS),
      database: process.env.POSTGRES_DB,
      models: [Client, Direction, DirectionType, User, Clinic],
      autoLoadModels: true,
      logging: false,
    }),
    JwtModule,
    ClientModule,
    DirectionsModule,
    DirectionTypesModule,
    UserModule,
    ClinicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
