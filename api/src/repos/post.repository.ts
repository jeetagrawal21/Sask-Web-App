import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entity/Users";

@EntityRepository(Users)

export class PostRepository extends Repository<Users>{

}