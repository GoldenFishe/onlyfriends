import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}