import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(url)
  }

  post(url: string, data) {
    console.log(data);
    return this.http.post(url, data);
  }
}
