import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
  } from 'typeorm'
import { Land } from './land'

  @Entity()
  export class Rent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Land, land  => land.rents)
    land: Land
    
  }