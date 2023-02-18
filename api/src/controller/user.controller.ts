// import { Router, Response, Request } from 'express';
// import { Users } from '../entity/Users';
// import { UserService } from '../services/user.service'; // import service

// export class PostController {
//   public router: Router;
//   private userService: UserService;

//   constructor() {
//     this.userService = new UserService(); // Create a new instance of PostController
//     this.router = Router();
//     this.routes();
//   }

//   public index = async (req: Request, res: Response) => {
//     const posts = await this.userService.index();
//     res.send(posts).json();
//   };

//   public create = async (req: Request, res: Response) => {
//     const post = req['body'] as Users;
//     const newPost = await this.userService.create(post);
//     res.send(newPost);
//   };

//   public update = async (req: Request, res: Response) => {
//     const post = req['body'] as Users;
//     const id = req['params']['id'];

//     res.send(this.userService.update(post, Number(id)));
//   };

//   public delete = async (req: Request, res: Response) => {
//     const id = req['params']['id'];
//     res.send(this.userService.delete(Number(id)));
//   };

//   /**
//    * Configure the routes of controller
//    */
//   public routes() {
//     this.router.get('/', this.index);
//     this.router.post('/', this.create);
//     this.router.put('/:id', this.update);
//     this.router.delete('/:id', this.delete);
//   }
// }
