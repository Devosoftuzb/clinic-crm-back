import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { Direction } from 'src/directions/models/direction.model';
import { Tbody } from 'src/tbody/models/tbody.model';

interface TheadAttr {
  clinic_id: string;
  direction_id: number;
  service_id: number;
  thead: any;
}
@Table({ tableName: 'thead' })
export class Thead extends Model<Thead, TheadAttr> {
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

  @ForeignKey(() => Direction)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  direction_id: number;

  @BelongsTo(() => Direction, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  direction: Direction;

  @ForeignKey(() => DirectionType)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  service_id: number;

  @BelongsTo(() => DirectionType, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  service: DirectionType;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  thead: any;

  @HasMany(() => Tbody, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  tbody: Tbody[];
}
