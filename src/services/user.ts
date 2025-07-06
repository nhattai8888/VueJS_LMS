import { httpClient } from '@/core/http/HttpClient';
import type { IResponse } from '@/models/IResponse';
import { type IUser } from '@/models/IUser';

export class UserService {
  static async getUsers(): Promise<IUser[]> {
    return httpClient.get('/users');
  }

  static async getUser(id: string): Promise<IUser> {
    return httpClient.get(`/users/${id}`);
  }

  static async createUser(data: Partial<IUser>): Promise<IResponse<IUser>>{
    return httpClient.post('/users', data);
  }

  static async deleteUser(id: string): Promise<any> {
    return httpClient.delete(`/users/${id}`);
  }
}
