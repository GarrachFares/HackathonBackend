import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    Column
  } from 'typeorm'
import { Land } from './land'

  @Entity()
  export class Rent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Land, land  => land.rents)
    land: Land

    @Column({
      type: 'text',
      nullable: true,
    })
    title: string

    @Column({
      type: 'text',
      nullable: true,
    })
    content: string    
  }