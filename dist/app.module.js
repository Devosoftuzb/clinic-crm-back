"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const client_module_1 = require("./client/client.module");
const client_model_1 = require("./client/models/client.model");
const directions_module_1 = require("./directions/directions.module");
const direction_model_1 = require("./directions/models/direction.model");
const direction_types_module_1 = require("./direction_types/direction_types.module");
const direction_types_model_1 = require("./direction_types/models/direction_types.model");
const user_module_1 = require("./user/user.module");
const user_model_1 = require("./user/models/user.model");
const clinic_module_1 = require("./clinic/clinic.module");
const clinic_model_1 = require("./clinic/models/clinic.model");
const auth_module_1 = require("./auth/auth.module");
const employees_module_1 = require("./employees/employees.module");
const employee_model_1 = require("./employees/models/employee.model");
const doctor_module_1 = require("./doctor/doctor.module");
const doctor_model_1 = require("./doctor/models/doctor.model");
const doctor_direction_module_1 = require("./doctor_direction/doctor_direction.module");
const doctor_direction_model_1 = require("./doctor_direction/models/doctor_direction.model");
const visits_module_1 = require("./visits/visits.module");
const visit_model_1 = require("./visits/models/visit.model");
const visit_directions_module_1 = require("./visit_directions/visit_directions.module");
const visit_direction_model_1 = require("./visit_directions/models/visit_direction.model");
const room_module_1 = require("./room/room.module");
const room_model_1 = require("./room/models/room.model");
const thead_module_1 = require("./thead/thead.module");
const tbody_module_1 = require("./tbody/tbody.module");
const thead_model_1 = require("./thead/models/thead.model");
const tbody_model_1 = require("./tbody/models/tbody.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: String(process.env.POSTGRES_PASS),
                database: process.env.POSTGRES_DB,
                models: [
                    client_model_1.Client,
                    direction_model_1.Direction,
                    direction_types_model_1.DirectionType,
                    user_model_1.User,
                    clinic_model_1.Clinic,
                    employee_model_1.Employee,
                    doctor_model_1.Doctor,
                    doctor_direction_model_1.DoctorDirection,
                    visit_model_1.Visit,
                    visit_direction_model_1.VisitDirection,
                    room_model_1.Room,
                    thead_model_1.Thead,
                    tbody_model_1.Tbody,
                ],
                autoLoadModels: true,
                logging: false,
            }),
            jwt_1.JwtModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            clinic_module_1.ClinicModule,
            employees_module_1.EmployeesModule,
            doctor_module_1.DoctorModule,
            client_module_1.ClientModule,
            directions_module_1.DirectionsModule,
            direction_types_module_1.DirectionTypesModule,
            doctor_direction_module_1.DoctorDirectionModule,
            visits_module_1.VisitsModule,
            visit_directions_module_1.VisitDirectionsModule,
            room_module_1.RoomModule,
            thead_module_1.TheadModule,
            tbody_module_1.TbodyModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map