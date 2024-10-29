import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DirectionType } from 'src/direction_types/models/direction_type.model';
import { Doctor } from 'src/doctor/models/doctor.model';

interface DoctorDirectionAttr {
  direction_id: number;
  doctor_id: string;
  price: number;
}

@Table({ tableName: 'doctor_direction' })
export class DoctorDirection extends Model<
  DoctorDirection,
  DoctorDirectionAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => DirectionType)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  direction_id: number;

  @BelongsTo(() => DirectionType, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  direction: DirectionType;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.STRING,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  doctor_id: string;

  @BelongsTo(() => Doctor, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  doctor: Doctor;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
}
