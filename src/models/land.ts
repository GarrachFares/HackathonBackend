import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
  } from 'typeorm'
import { Rent } from './rent'
import { ModRequest } from './request'
import { User } from './user'
  
  
  @Entity()
  export class Land extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    
    @Column("double")
    latitude: number

    @Column("double")
    longitude: number
  

    @ManyToOne(() => User, owner  => owner.ownedLands)
    owner: User

    
    @OneToOne(() => User, (mod) => mod.moderatedLand)
    @JoinColumn()
    moderator: User
    
    
    @OneToMany(() => User, user => user.residentAt, {
        cascade: true,
    })
    residents: Promise<User[]>
    
    @OneToOne(() => ModRequest, (modRequest) => modRequest.land, {
        cascade: true,
    })
    modRequest: ModRequest

    @OneToMany(() => Rent, rent => rent.land, {
        cascade: true,
      })
    rents: Promise<Rent[]>
  }