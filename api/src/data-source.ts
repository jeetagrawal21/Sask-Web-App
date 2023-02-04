import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
  database: "SaskLongCovidData",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

