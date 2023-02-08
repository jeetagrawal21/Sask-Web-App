import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";
import { ParticipantID } from "./entity/ParticipantID";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
  database: "SaskLongCovidData",
  synchronize: true,
  logging: false,
  entities: [User,ParticipantID],
  subscribers: [],
  migrations: [],
});

