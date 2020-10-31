import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {LoginService} from "./login.service";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoginService]
})
export class LoginModule {
}
