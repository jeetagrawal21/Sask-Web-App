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
async function add(req: IReq<{user: IUser}>, res: IRes) {
  const request = req.body;
  console.log(typeof request);
  const new_user = new Users();
  console.log(request.user);
  // new_user.email = request.user.email;
  // new_user.surname = request.user.surname;
  // new_user.participant_id = request.user.participant_id;
  // new_user.givename1 = request.user.givename1;
  // new_user.givename2 = request.user.givename2;
  // new_user.question1 = request.user.question1;
  // new_user.question2 = request.user.question2;
  // new_user.question3 = request.user.question3;
  // new_user.answer1 = request.user.answer1;
  // new_user.answer2 = request.user.answer2;
  // new_user.answer3 = request.user.answer3;
  // new_user.pwdHash = String(request.user.pwdHash);
  console.log(new_user);
  
  const a = new Users();
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
