import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { Client } from './client/models/client.model';
import { DirectionsModule } from './directions/directions.module';
import { Direction } from './directions/models/direction.model';
import { DirectionTypesModule } from './direction_types/direction_types.module';
import { DirectionType } from './direction_types/models/direction_types.model';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { ClinicModule } from './clinic/clinic.module';
import { Clinic } from './clinic/models/clinic.model';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/models/employee.model';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/models/doctor.model';
import { DoctorDirectionModule } from './doctor_direction/doctor_direction.module';
import { DoctorDirection } from './doctor_direction/models/doctor_direction.model';
import { VisitsModule } from './visits/visits.module';
import { Visit } from './visits/models/visit.model';
import { VisitDirectionsModule } from './visit_directions/visit_directions.module';
import { VisitDirection } from './visit_directions/models/visit_direction.model';
import { RoomModule } from './room/room.module';
import { Room } from './room/models/room.model';
// import { TheadModule } from './thead/thead.module';
// import { TbodyModule } from './tbody/tbody.module';
// import { Thead } from './thead/models/thead.model';
// import { Tbody } from './tbody/models/tbody.model';

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
      models: [
        Client,
        Direction,
        DirectionType,
        User,
        Clinic,
        Employee,
        Doctor,
        DoctorDirection,
        Visit,
        VisitDirection,
        Room,
        // Thead,
        // Tbody,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    JwtModule,
    AuthModule,
    UserModule,
    ClinicModule,
    EmployeesModule,
    DoctorModule,
    ClientModule,
    DirectionsModule,
    DirectionTypesModule,
    DoctorDirectionModule,
    VisitsModule,
    VisitDirectionsModule,
    RoomModule,
    // TheadModule,
    // TbodyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
