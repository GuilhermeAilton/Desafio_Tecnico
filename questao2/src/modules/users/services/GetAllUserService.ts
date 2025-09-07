// src/modules/http/users/services/GetAllUsersService.ts
import UsersRepository, { User } from '../infra/http/repositories/userRepository';

interface GetAllUsersParams {
  page?: number;
  page_size?: number;
  q?: string;
  role?: string;
  is_active?: string | boolean;
  sort?: keyof User; 
  order?: 'asc' | 'desc'; 
}

interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

interface GetAllUsersResponse {
  data: User[];
  pagination: Pagination;
}

export class GetAllUsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    page = 1,
    page_size = 10,
    q,
    role,
    is_active,
    sort,
    order = 'asc',
  }: GetAllUsersParams = {}): Promise<GetAllUsersResponse> {
    page = Number(page);
    page_size = Math.min(Number(page_size), 50);

    let filteredUsers = await this.usersRepository.findFiltered({ q, role, is_active });

    // Ordenação
    if (sort) {
      filteredUsers.sort((a, b) => {
        if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
        if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = filteredUsers.length;
    const start = (page - 1) * page_size;
    const data = filteredUsers.slice(start, start + page_size);

    return {
      data,
      pagination: {
        page,
        page_size,
        total,
        total_pages: Math.ceil(total / page_size),
      },
    };
  }
}
