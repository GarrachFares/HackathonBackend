import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    ManyToOne,
  } from 'typeorm'
import { User } from './user'
  
  
  @Entity()
  export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    
    @Column()
    month: number
    
    @Column()
    year: number
    
    @ManyToOne(() => User, user  => user.transactions)
    owner: User
    
  }