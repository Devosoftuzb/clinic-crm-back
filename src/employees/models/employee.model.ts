import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';

interface EmployeeAttr {
  clinic_id: string;
  full_name: string;
  birthday: string;
  phone_number: string;
  login: string;
  hashed_password: string;
  hashed_refresh_token: string;
  role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}

@Table({ tableName: 'employee' })
export class Employee extends Model<Employee, EmployeeAttr> {
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
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.ENUM,
    values: ['manager', 'administrator', 'accountant', 'storekeeper'],
    allowNull: false,
  })
  role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}
