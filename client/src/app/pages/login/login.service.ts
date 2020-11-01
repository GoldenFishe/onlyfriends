import {Injectable} from '@angular/core';
import {ApiService} from "../../api.service";

@Injectable()
export class LoginService {

  constructor(private api: ApiService) {
  }

  signIn(login: string, password: string) {
    return this.api.post('/api/auth/sign-in', {login, password});
  }
}
