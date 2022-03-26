import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
  } from 'typeorm'
import { Land } from './land'
import { User } from './user'
  
  
  @Entity()
  export class ModRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @OneToOne(() => User, (modCandidat) => modCandidat.modRequest)
    @JoinColumn()
    moderator: User

    @OneToOne(() => Land, (land) => land.modRequest)
    @JoinColumn()
    land: Land
      modRequest: ModRequest
    
    
  }