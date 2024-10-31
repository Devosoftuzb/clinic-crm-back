import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/client/models/client.model';
import { Clinic } from 'src/clinic/models/clinic.model';

interface VisitAttr {
  clinic_id: string;
  client_id: string;
  visit_date: string;
  stay_type: 'outpatient' | 'hospital';
  total_amount: number;
  total_balance: number;
  discount: number;
}

@Table({ tableName: 'visits' })
export class Visit extends Model<Visit, VisitAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  clinic_id: string;

  @BelongsTo(() => Clinic)
  clinic: Clinic;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  client_id: string;

  @BelongsTo(() => Client)
  client: Client;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  visit_date: string;

  @Column({
    type: DataType.ENUM,
    values: ['outpatient', 'hospital'],
    allowNull: false,
  })
  stay_type: 'outpatient' | 'hospital';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_balance: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discount: number;

  //   @HasMany(() => VisitDirection)
  //   visitDirections: VisitDirection[];
}
