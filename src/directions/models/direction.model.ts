import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DirectionType } from 'src/direction_types/models/direction_type.model';

interface DirectionAttr {
  name: string;
}

@Table({ tableName: 'direction' })
export class Direction extends Model<Direction, DirectionAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => DirectionType, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  direction_types: DirectionType[];
}
