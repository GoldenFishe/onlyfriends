import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ProfileService} from "./profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  films = [];
  potentialFriends = [];
  film = new FormControl('');
  userId = this.route.snapshot.params['userId'];
  userInfo = null;

  constructor(private service: ProfileService, private route: ActivatedRoute) {
  }

  addFilm() {
    this.service.saveFilm(this.film.value, this.userId).subscribe(film => this.films.push(film));
    this.film.reset();
  }

  getFilms(userId) {
    this.service.getUserFilms(userId).subscribe((films: object[]) => this.films = films)
  }

  getUserInfo(userId) {
    this.service.getUserInfo(userId).subscribe((info: object) => this.userInfo = info);
  }

  getPotentialFriends(userId) {
    this.service.getPotentialFriends(userId).subscribe((friends: []) => this.potentialFriends = friends);
  }

  ngOnInit(): void {
    this.getFilms(this.userId);
    // this.getUserInfo(this.userId);
    // this.getPotentialFriends(this.userId);
  }
}
