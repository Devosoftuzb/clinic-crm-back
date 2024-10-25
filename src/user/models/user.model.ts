import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';

interface UserAttr {
  full_name: string;
  phone_number: string;
  login: string;
  hashed_password: string;
  hashed_refresh_token: string;
  role: 'superadmin'| 'admin'| 'owner';
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttr> {
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
  full_name: string;

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
    values: ['superadmin', 'admin', 'owner'],
    allowNull: false,
  })
  role: 'superadmin'| 'admin'| 'owner';

  @HasMany(() => Clinic, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  clinics: Clinic[];
}
