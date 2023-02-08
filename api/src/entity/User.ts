import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "user"})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({nullable: true})
  surname?: string;
  @Column({nullable: true})
  email?: string;
  @Column({nullable: true})
  participant_id?: number ;
  @Column({nullable: true})
  givename1?: string ;
  @Column({nullable: true})
  givename2!: string;
  @Column({nullable: true})
  question1!: string;
  @Column({nullable: true})
  question2!: string;
  @Column({nullable: true})
  question3!: string;
  @Column({nullable: true})
  answer1!: string;
  @Column({nullable: true})
  answer2!: string;
  @Column({nullable: true})
  answer3!: string;
  @Column({nullable: true})
  pwdHash!: string;
}
