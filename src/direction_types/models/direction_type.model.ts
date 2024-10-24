import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Direction } from 'src/directions/models/direction.model';

interface DirectionTypeAttr {
  direction_id: number;
  name: string;
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
}
