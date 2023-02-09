import { AppDataSource } from './../data-source';
import { Users } from "@src/entity/Users";


const userRepository = AppDataSource.getRepository(Users);

/**
 * Get all users.
 */
async function getAll(): Promise<Users[]> {
  return userRepository.find({
    take: 10,
  });
}
/**
 * Get one user.
 */
async function getOne(email: string): Promise<Users | null> {
  const db = await userRepository.findOne({
    where: {
      email: email,
    },
  });
  if (db != null) {
    return db;
  }
  else return null;
}

/**
 * Add one user.
 */
async function add(user: Users): Promise<void> {
  const db = userRepository.create(user);
  userRepository.save(db);
  return Promise.resolve();
}


export default {
  getOne,
  // persists,
  getAll,
  add,
  // update,
  // delete: _delete,
} as const;