import { Thead } from './../../thead/models/thead.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface TbodyAttr {
  thead_id: number;
  trow: any;
  result: string;
}

@Table({ tableName: 'tbody' })
export class Tbody extends Model<Tbody, TbodyAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Thead)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  thead_id: number;

  @BelongsTo(() => Thead, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  thead: Thead;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  trow: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  result: string;
}
