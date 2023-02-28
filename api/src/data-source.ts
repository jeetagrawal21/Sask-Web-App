import { DataSource } from "typeorm";
import "reflect-metadata";
import { Users } from "./entity/Users";
import { ParticipantID } from "./entity/ParticipantID";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
  database: "users",
  synchronize: true,
  logging: false,
  //entities: [Users,ParticipantID],
  subscribers: [],
  migrations: [],
});

