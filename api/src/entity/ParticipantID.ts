import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "participant_id"})
export class ParticipantID {
  @PrimaryGeneratedColumn()
    id!: number;
  @PrimaryColumn()
    participantid?: number ;
}
