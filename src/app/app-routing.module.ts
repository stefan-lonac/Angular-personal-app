import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './games/hangman/hangman.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemPageComponent } from './item/item-page/item-page.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WeatherComponent } from './weather/weather.component';
import { QuizComponent } from './games/quiz/quiz.component';
import { ApplicationRoutes } from './consts/application-routes';
import { RouterParams } from './consts/router-params';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: ApplicationRoutes.Todos._Base,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        title: 'Todos',
        loadComponent: () =>
          import('./item/item-list/item-list.component').then(
            (c) => c.ItemListComponent
          ),
      },
      {
        path: `${ApplicationRoutes.Todos.ItemDetails}/:${RouterParams.ItemId}`,
        title: 'Item',
        loadComponent: () =>
          import('./item/item-page/item-page.component').then(
            (c) => c.ItemPageComponent
          ),
      },
    ],
  },

  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'weather',
    title: 'Weather',
    component: WeatherComponent,
    canActivate: [AuthGuard],
  },

  // TODO in future ** path: 'games' **
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'hangman', title: 'Hangman', component: HangmanComponent },
      { path: 'quiz', title: 'Quiz', component: QuizComponent },
    ],
  },

  { path: '**', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
