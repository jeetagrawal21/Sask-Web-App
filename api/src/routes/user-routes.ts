import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import userService from '@src/services/user-service';
// import { IUser } from '@src/models/User';
import { Users } from '@src/entity/Users';
import { IReq, IRes } from './shared/types';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/users',
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const;



interface IUser {
  id: number;
  surname: string;
  email: string;
  participant_id: number;
  givename1: string;
  givename2: string;
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;
  pwdHash: string;
}


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await userService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<IUser>, res: IRes) {
  const { id,surname,email,participant_id,givename1,givename2,question1,question2,question3,answer1,answer2,answer3,pwdHash} = req.body;
  const new_user = new Users();
  new_user.email = email;
  new_user.surname = surname;
  new_user.participant_id = participant_id;
  new_user.givename1 = givename1;
  new_user.givename2 = givename2;
  new_user.question1 = question1;
  new_user.question2 = question2;
  new_user.question3 = question3;
  new_user.answer1 = answer1;
  new_user.answer2 = answer2;
  new_user.answer3 = answer3;
  new_user.pwdHash = pwdHash;
  console.log(new_user);
  
  await userService.addOne(new_user);
  return res.status(HttpStatusCodes.CREATED).end();
}

// /**
//  * Update one user.
//  */
// async function update(req: IReq<{user: IUser}>, res: IRes) {
//   const { user } = req.body;
//   await userService.updateOne(user);
//   return res.status(HttpStatusCodes.OK).end();
// }

// /**
//  * Delete one user.
//  */
// async function _delete(req: IReq, res: IRes) {
//   const id = +req.params.id;
//   await userService.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }


// **** Export default **** //

export default {
  paths,
  getAll,
  add,
  // update,
  // delete: _delete,
} as const;
