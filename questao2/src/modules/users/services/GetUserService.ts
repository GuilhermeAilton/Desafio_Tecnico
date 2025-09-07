// src/modules/http/users/services/GetUserByIdService.ts
import UsersRepository, { User } from '../infra/http/repositories/userRepository';

export class GetUserByIdService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute(id: string | number): Promise<User | undefined> {
    return this.usersRepository.findById(id);
  }
}
