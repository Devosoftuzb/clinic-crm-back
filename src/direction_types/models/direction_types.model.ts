import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Direction } from 'src/directions/models/direction.model';
import { DoctorDirection } from 'src/doctor_direction/models/doctor_direction.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';

interface DirectionTypeAttr {
  direction_id: number;
  name: string;
  status: boolean;
}

@Table({ tableName: 'direction_type' })
export class DirectionType extends Model<DirectionType, DirectionTypeAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  status: boolean;

  @HasMany(() => DoctorDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  doctorDirection: DoctorDirection[];

  @HasMany(() => VisitDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  visit_directions: VisitDirection[];
}
