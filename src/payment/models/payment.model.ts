import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { Direction } from 'src/directions/models/direction.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { Room } from 'src/room/models/room.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
import { Visit } from 'src/visits/models/visit.model';

interface PaymentAttr {
  clinic_id: string;
  visit_id: number;
  room_id: number;
  direction_id: number;
  payment_method_id: number;
  price: number;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  clinic_id: string;

  @BelongsTo(() => Clinic, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  clinic: Clinic;

  @ForeignKey(() => Visit)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  visit_id: number;

  @BelongsTo(() => Visit, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  visit: Visit;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: true,
  })
  room_id: number;

  @BelongsTo(() => Room, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  room: Room;

  @ForeignKey(() => VisitDirection)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: true,
  })
  direction_id: number;

  @BelongsTo(() => VisitDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  direction: VisitDirection;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: true,
  })
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  payment_method: PaymentMethod;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
}
