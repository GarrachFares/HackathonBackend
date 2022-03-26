import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
  } from 'typeorm'
import { FeedBack } from './feedback'
import { Land } from './land'
import { ModRequest } from './request'
import { Transaction } from './transaction'
  
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column({
      type: 'text',
      enum:['LANDLORD', 'MODERATOR', 'RESIDENT']
    })
    role:string
    
    @Column({
      nullable: true,
    })
    fullname: string

    @Column(
      {
        nullable: true,
      }
    )
    phone: string
  
    @Column({
    type: 'text',
    })
    email: string
    
    //auto generated
    @Column({
      type: 'text',
      nullable: true,
      })
    username: string
    
    generateUsername() {  
      //random number generator
      const random = Math.floor(Math.random() * 1000000)
      this.username = this.fullname + random
    }

    @Column({
      type: 'text',
    })
    password: string

    @Column({
      default: false,
    })
    isActive: boolean //true for LANDLORD, MODERATOR

    
    @ManyToOne(() => Land, land  => land.residents)
    residentAt: Land

    @Column({
      nullable: true,
    })
    residentAtPriceOf: number  

    @OneToMany(() => Transaction, transaction => transaction.owner, {
      cascade: true,
    })
    transactions: Promise<Transaction[]>

    //owner column
    @OneToMany(() => Land, land => land.owner, {
      cascade: true,
    })
    ownedLands: Promise<Land[]>

    //mod column
    @OneToOne(() => Land, (land) => land.moderator, {
      cascade: true,
    })
    moderatedLand: Land

    //also modCandidat column
    @OneToMany(() => ModRequest, modReq => modReq.moderator, {
      cascade: true,
    })
    modRequests: Promise<ModRequest[]>

    @OneToMany(() => FeedBack, feedBack => feedBack.owner, {
      cascade: true,
    })
    feedBacks: Promise<FeedBack[]>
    
  }