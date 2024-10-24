import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
