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
import { Clinic } from 'src/clinic/models/clinic.model';
import { Room } from 'src/room/models/room.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';

interface VisitAttr {
  clinic_id: string;
  client_id: string;
  visit_date: string;
  stay_type: 'outpatient' | 'hospital';
  total_amount: number;
  total_balance: number;
  discount: number;
  room_id: number;
  start_date: string;
  end_date: string;
  is_partner: boolean;
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
    defaultValue: 0,
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
    defaultValue: 0,
  })
  discount: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  room_id: string;

  @BelongsTo(() => Room)
  room: Room;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  start_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  end_date: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_partner: boolean;

  @HasMany(() => VisitDirection)
  visitDirections: VisitDirection[];
}
