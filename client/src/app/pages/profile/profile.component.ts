import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  films = ['Я видел дьявола', 'Олдбой', 'Апокалипсис сегодня', 'Звонок'];
  film = new FormControl('');

  constructor() {
  }

  addFilm() {
    this.films.push(this.film.value);
    this.film.reset();
  }

  ngOnInit(): void {
  }

}
