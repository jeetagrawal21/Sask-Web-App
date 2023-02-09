import { DataSource } from "typeorm";
import "reflect-metadata";
import { Users } from "./entity/Users";
import { ParticipantID } from "./entity/ParticipantID";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Users,ParticipantID],
  subscribers: [],
  migrations: [],
});

