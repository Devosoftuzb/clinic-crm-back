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
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';

interface DirectionAttr {
  clinic_id: string;
  name: string;
  status: boolean;
}

@Table({ tableName: 'direction' })
export class Direction extends Model<Direction, DirectionAttr> {
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

  @HasMany(() => DirectionType, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  direction_types: DirectionType[];

  @HasMany(() => VisitDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  visit_directions: VisitDirection[];
}
