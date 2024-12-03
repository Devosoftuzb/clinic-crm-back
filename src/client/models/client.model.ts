import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';

interface ClientAttr {
  clinic_id: string;
  passport: string;
  full_name: string;
  birthday: string;
  phone_number: string;
  sex: 'male' | 'female';
  nonresident: boolean;
  address: string;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, ClientAttr> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
}
