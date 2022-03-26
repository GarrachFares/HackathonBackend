import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm'
import { Land } from './land'
import { User } from './user'
  
  
  @Entity()
  export class ModRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    
    @ManyToOne(() => User, user  => user.modRequests)
    moderator: User

    @ManyToOne(() => Land, land  => land.modRequests)
    land: Land
    
  }