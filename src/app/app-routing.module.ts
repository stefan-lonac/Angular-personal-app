import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './games/hangman/hangman.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { loginGuard } from './auth/guards/login.guard';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WeatherComponent } from './weather/weather.component';
import { QuizComponent } from './games/quiz/quiz.component';
import { ApplicationRoutes } from './consts/application-routes';
import { RouterParams } from './consts/router-params';
import { ItemResolver } from './item/resolvers/item.resolver';
import { isOwnTodoItem } from './auth/guards/is-own-todo-item.guard';
import { CanDeactivateEditGuardFn } from './auth/guards/can-deactivate-edit.guard';

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
    canActivate: [loginGuard],
    canDeactivate: [CanDeactivateEditGuardFn],
    title: 'Todos',
    loadComponent: () =>
      import('./item/item-list/item-list.component').then(
        (c) => c.ItemListComponent,
      ),
  },
  {
    path: `${ApplicationRoutes.Item._Base}/:${RouterParams.ItemId}`,
    canActivate: [loginGuard, isOwnTodoItem],
    canDeactivate: [CanDeactivateEditGuardFn],
    loadComponent: () =>
      import('./item/item-page/item-page.component').then(
        (c) => c.ItemPageComponent,
      ),
    resolve: {
      [RouterParams.ItemId]: ItemResolver,
    },
    data: { process: true },
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [loginGuard],
    canDeactivate: [CanDeactivateEditGuardFn],
  },
  {
    path: 'weather',
    title: 'Weather',
    component: WeatherComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    canActivate: [loginGuard],
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
