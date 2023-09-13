import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemsSevice } from './item/item.service';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { SignoutDialogComponent } from './profile/signout-dialog/signout-dialog.component';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';
import { DeleteDialogComponent } from './item/delete-dialog/delete-dialog.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WeatherComponent } from './weather/weather.component';
import { ApixuService } from './weather/apixu.service';
import { TemperaturePipeClass } from './weather/pipe/temperature-class.pipe';
import { LengthClassDirective } from './shared/directive/length-class.directive';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbSidebarComponent,
  NbMenuComponent,
  NbMenuModule,
  NbButtonModule,
  NbTreeGridModule,
  NbSelectComponent,
  NbSelectModule,
  NbRadioComponent,
  NbRadioModule,
  NbInputModule,
  NbToggleModule,
  NbCheckboxComponent,
  NbCheckboxModule,
  NbDialogModule,
  NbUserComponent,
  NbUserModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbSidebarModule,
  NbButtonGroupModule,
  NbListPageTrackerDirective,
  NbListModule,
  NbIconModule,
  NbToastrService,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmptyTextPipe } from './shared/pipe/empty-text.pipe';
import { HangmanComponent } from './games/hangman/hangman.component';
import { DisableButton } from './item/shared/pipe/disable-button.pipe';
import { QuizComponent } from './games/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    // ItemComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    SignoutDialogComponent,
    ThemeSwitcherComponent,
    DeleteDialogComponent,
    SignUpComponent,
    WeatherComponent,
    LengthClassDirective,
    HangmanComponent,
    EmptyTextPipe,
    TemperaturePipeClass,
    QuizComponent,
  ],
  imports: [
    // ItemListComponent,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // CommonModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    // FontAwesomeModule,
    FlexLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbTreeGridModule,
    NbSelectModule,
    NbRadioModule,
    NbInputModule,
    NbToggleModule,
    NbCheckboxModule,
    NbUserModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbButtonGroupModule,
    NbListModule,
    NbIconModule,
  ],
  providers: [
    HeaderService,
    ItemsSevice,
    AuthService,
    ApixuService,
    NbSidebarComponent,
    NbMenuComponent,
    NbSelectComponent,
    NbRadioComponent,
    NbCheckboxComponent,
    NbUserComponent,
    NbListPageTrackerDirective,
    NbToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
