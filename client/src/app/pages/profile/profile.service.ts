import {Injectable} from "@angular/core";
import {ApiService} from "../../api.service";

@Injectable()
export class ProfileService {
  constructor(private api: ApiService) {
  }

  saveFilm(title: string) {
    this.api.post('/api/film', {title})
  }
}
