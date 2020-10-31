import {Injectable} from "@angular/core";
import {ApiService} from "../../api.service";

@Injectable()
export class ProfileService {
  constructor(private api: ApiService) {
  }

  saveFilm(title: string, userId) {
    return this.api.post('/api/film', {title, userId});
  }

  getUserFilms(userId: number) {
    return this.api.post('/api/films', {userId});
  }

  getUserInfo(userId: number) {
    return this.api.get(`/api/user/${userId}`);
  }

  getPotentialFriends(userId: number) {
    return this.api.get(`/api/potential-friends/${userId}`);
  }
}
