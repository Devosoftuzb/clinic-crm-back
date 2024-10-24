import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ClientAttr {
  passport: string;
  full_name: string;
  birthday: string;
  phone_number: string;
  sex: 'male' | 'female';
  nonresident: boolean;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, ClientAttr> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  passport: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  birthday: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  sex: 'male' | 'female';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  nonresident: boolean;
}
