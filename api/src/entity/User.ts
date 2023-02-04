import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;
  @Column()
    email!: string;
  @Column()
    surname!: string;
  @Column()
    participant_id!: number ;
  @Column()
    givename1!: string ;
  @Column()
    givename2!: string;
  @Column()
    pwdHash!: string;
}
