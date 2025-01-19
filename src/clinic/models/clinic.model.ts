import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/client/models/client.model';
import { Direction } from 'src/directions/models/direction.model';
import { Doctor } from 'src/doctor/models/doctor.model';
import { Employee } from 'src/employees/models/employee.model';
import { Payment } from 'src/payment/models/payment.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { Room } from 'src/room/models/room.model';
import { User } from 'src/user/models/user.model';
import { Visit } from 'src/visits/models/visit.model';

interface ClinicAttr {
  name: string;
  address: string;
  owner_id: string;
}

@Table({ tableName: 'clinic' })
export class Clinic extends Model<Clinic, ClinicAttr> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  owner_id: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  owner: User;

  @HasMany(() => Client, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  clients: Client[];

  @HasMany(() => Direction, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  directions: Direction[];

  @HasMany(() => Employee, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  employees: Employee[];

  @HasMany(() => Doctor, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  doctors: Doctor[];

  @HasMany(() => Visit, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  visits: Visit[];

  @HasMany(() => Room, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  rooms: Room[];

  @HasMany(() => PaymentMethod, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  payment_method: PaymentMethod[];

  @HasMany(() => Payment, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  payment: Payment[];
}
