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
import { DoctorDirection } from 'src/doctor_direction/models/doctor_direction.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';

interface DoctorAttr {
  clinic_id: string;
  full_name: string;
  birthday: string;
  phone_number: string;
  experience: number;
  room: string;
  login: string;
  hashed_password: string;
  hashed_refresh_token: string;
  role: 'doctor' | 'lab_technician' | 'external_doctor';
}

@Table({ tableName: 'doctor' })
export class Doctor extends Model<Doctor, DoctorAttr> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  experience: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  room: string;

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
    values: ['doctor', 'lab_technician', 'external_doctor'],
    allowNull: false,
  })
  role: 'doctor' | 'lab_technician' | 'external_doctor';

  @HasMany(() => DoctorDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  doctorDirection: DoctorDirection[];

  @HasMany(() => VisitDirection, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  visit_directions: VisitDirection[];
}
