import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';

import {environment} from "../environments/environment";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  get headers() {
    return new HttpHeaders({
      // 'Content-Type':  'application/json',
      Authorization: `Bearer ${this.token}`
    })
  }

  get(url: string) {
    return this.http.get(`${environment.API_URI}${url}`, {headers: this.headers})
  }

  post(url: string, data) {
    return this.http.post(`${environment.API_URI}${url}`, data, {headers: this.headers});
  }
}
