import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { Direction } from 'src/directions/models/direction.model';
import { Doctor } from 'src/doctor/models/doctor.model';
import { Visit } from 'src/visits/models/visit.model';

interface VisitDirectionAttr {
  visit_id: number;
  direction_id: number;
  service_id: number;
  doctor_id: number;
  price: number;
  line: number;
}

@Table({ tableName: 'visit_direction' })
export class VisitDirection extends Model<VisitDirection, VisitDirectionAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Visit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  visit_id: number;

  @BelongsTo(() => Visit)
  visit: Visit;

  @ForeignKey(() => Direction)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  direction_id: number;

  @BelongsTo(() => Direction)
  direction: Direction;

  @ForeignKey(() => DirectionType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;

  @BelongsTo(() => DirectionType)
  service: DirectionType;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  doctor_id: string;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  line: number;
}
