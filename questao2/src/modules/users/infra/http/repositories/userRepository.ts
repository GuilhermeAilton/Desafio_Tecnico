import { readFileSync } from 'fs';
import { resolve } from 'path';

const filePath = resolve(__dirname, '../../../../../shared/data/mock-users.json');

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface FindUsersParams {
  q?: string;
  role?: string;
  is_active?: boolean | string;
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: number | string): Promise<User | undefined> {
    return this.users.find(u => u.id === Number(id));
  }

  public async findFiltered(params: FindUsersParams = {}): Promise<User[]> {
    let result = this.users;

    if (params.q) {
      const q = params.q.toLowerCase();
      result = result.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    if (params.role) {
      result = result.filter(u => u.role === params.role);
    }

    if (params.is_active !== undefined) {
      const active = params.is_active === 'true' || params.is_active === true;
      result = result.filter(u => u.is_active === active);
    }

    return result;
  }
}

export default UsersRepository;
