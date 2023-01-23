import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './games/hangman/hangman.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemPageComponent } from './item/item-page/item-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    // data: { animation: 'Login' },
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
    // data: { animation: 'SignUp' },
  },

  {
    path: 'todos',
    component: ItemListComponent,
    // data: { animation: 'ItemsList' },
    canActivate: [AuthGuard],
  },
  {
    path: 'todos',
    children: [{ path: 'item/:id', component: ItemPageComponent }],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    // data: { animation: 'Profile' },
    canActivate: [AuthGuard],
  },

  {
    path: 'weather',
    component: WeatherComponent,
    // data: { animation: 'Weather' },
    canActivate: [AuthGuard],
  },

  // TODO in future ** path: 'games' **
  {
    path: '',
    canActivate: [AuthGuard],
    children: [{ path: 'hangman', component: HangmanComponent }],
  },

  { path: '**', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
