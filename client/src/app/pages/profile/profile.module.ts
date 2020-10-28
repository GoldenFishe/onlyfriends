import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {ProfileService} from "./profile.service";
import {ProfileComponent} from "./profile.component";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ProfileService]
})
export class ProfileModule {
}
