import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    ManyToOne,
  } from 'typeorm'
import { User } from './user'
  
  
  @Entity()
  export class FeedBack extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @ManyToOne(() => User, owner  => owner.feedBacks)
    owner: User

    @Column()
    content: string
    
    
  }