import { httpClient } from '@/core/http/HttpClient';
import type { IAuth } from '@/models/IAuth';
import type { ILogin } from '@/models/IUser';


export class AuthService {
  static async login(email: string, password: string): Promise<IAuth> {
    const user:ILogin = {
      "email":email,
      "password":password 
    }
    return httpClient.post('/login', user);
  }
}
