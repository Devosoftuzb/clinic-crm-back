import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/client/models/client.model';
import { Direction } from 'src/directions/models/direction.model';
import { User } from 'src/user/models/user.model';

interface ClinicAttr {
  name: string;
  address: string;
  owner_id: string;
}

@Table({ tableName: 'clinic' })
export class Clinic extends Model<Clinic, ClinicAttr> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  owner_id: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  owner: User;

  @HasMany(() => Client, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  clients: Client[];

  @HasMany(() => Direction, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  directions: Direction[];
}
