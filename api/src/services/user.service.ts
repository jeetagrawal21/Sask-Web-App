import { getConnection } from 'typeorm';
import { Users } from '../entity/Users';
import { UserRepository } from '../repos/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository =
      getConnection('blog').getCustomRepository(UserRepository);
  }

  public index = async () => {
    const posts = await this.userRepository.find();
    return posts;
  };

  public create = async (post: Users) => {
    const newPost = await this.userRepository.save(post);
    return newPost;
  };

  public update = async (post: Users, id: number) => {
    const updatedPost = await this.userRepository.update(id, post);
    return updatedPost;
  };

  public delete = async (id: number) => {
    const deletedPost = await this.userRepository.delete(id);
    return deletedPost;
  };
}
